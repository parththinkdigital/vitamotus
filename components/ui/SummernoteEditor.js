"use client";

import { useEffect, useRef } from "react";
import { marked } from "marked";
import DOMPurify from "dompurify";

export default function SummernoteEditor({ value, onChange, height = 600 }) {
  const editorRef = useRef(null);
  const $editorRef = useRef(null);
  const onChangeRef = useRef(onChange);
  const readyRef = useRef(false);

  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  useEffect(() => {
    let cancelled = false;

    async function init() {
      if (typeof window.$ === "undefined" || typeof window.$.summernote === "undefined") {
        await Promise.all([
          loadScript("https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js"),
          loadStyle("https://cdnjs.cloudflare.com/ajax/libs/summernote/0.9.1/summernote-lite.min.css"),
        ]);
        await loadScript("https://cdnjs.cloudflare.com/ajax/libs/summernote/0.9.1/summernote-lite.min.js");

        window.$ = window.jQuery = window.$;
      }

      if (cancelled || !editorRef.current) return;

      const $ = window.$;
      const $editor = $(editorRef.current);

      $editor.summernote({
        height,
        placeholder: "Write your post content here...",
        styleTags: ["p", "blockquote", "pre", "h1", "h2", "h3", "h4", "h5", "h6"],
        toolbar: [
          ["style", ["style"]],
          ["font", ["bold", "italic", "underline", "strikethrough", "clear"]],
          ["fontname", ["fontname"]],
          ["fontsize", ["fontsize"]],
          ["color", ["color"]],
          ["para", ["ul", "ol", "paragraph"]],
          ["height", ["height"]],
          ["table", ["table"]],
          ["insert", ["link", "picture", "video", "hr"]],
          ["view", ["fullscreen", "codeview", "help"]],
          ["misc", ["undo", "redo"]],
        ],
        fontNames: ["Arial", "Arial Black", "Comic Sans MS", "Courier New", "Helvetica", "Impact", "Tahoma", "Times New Roman", "Verdana", "Georgia", "Poppins", "Inter", "Roboto"],
        fontSizes: ["8", "9", "10", "11", "12", "14", "16", "18", "20", "24", "28", "32", "36", "48", "64", "72"],
        dialogsInBody: true,
        codeviewFilter: true,
        codeviewIframeFilter: true,
        callbacks: {
          onChange(html) {
            onChangeRef.current(html);
          },
          onPaste(e) {
            e.preventDefault();

            const clipboard = e.originalEvent.clipboardData || window.clipboardData;
            const html = clipboard.getData("text/html");
            const text = clipboard.getData("text/plain");

            let content = "";

            if (html) {
              content = cleanPastedHtml(html);
            } else if (text) {
              if (isMarkdown(text)) {
                content = marked.parse(text);
              } else {
                const fixed = text
                  .replace(/-\n/g, "")
                  .replace(/\n{3,}/g, "\n\n");
                content = fixed
                  .split(/\n{2,}/)
                  .map(p => `<p>${escapeHtml(p.trim())}</p>`)
                  .join("");
              }
            }

            if (content) {
              $(this).summernote("pasteHTML", content);
            }

            return false;
          },
        },
      });

      if (value) {
        $editor.summernote("code", value);
      }

      $editorRef.current = $editor;
      readyRef.current = true;
    }

    init();

    return () => {
      cancelled = true;
      if ($editorRef.current) {
        try { $editorRef.current.summernote("destroy"); } catch {}
        $editorRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!readyRef.current || !$editorRef.current) return;
    const $ = window.$;
    const current = $editorRef.current.summernote("code");
    if (current !== value) {
      $editorRef.current.summernote("code", value);
    }
  }, [value]);

  return <div ref={editorRef} />;
}

function isMarkdown(text) {
  const patterns = [
    /^#{1,6}\s/m,                    // headings
    /^[-*+]\s/m,                     // unordered lists
    /^\d+[.)]\s/m,                   // ordered lists
    /(\*\*|__).+?\1/,                // bold
    /(?:^|\W)\*[^*\n]+\*(?:$|\W)/,   // italic (*)
    /(?:^|\W)_[^_\n]+_(?:$|\W)/,     // italic (_)
    /`{1,3}[^`]+`{1,3}/,             // inline/code blocks
    /\[.+?\]\(.+?\)/,                // links
    /!\[.+?\]\(.+?\)/,               // images
    /^>\s/m,                         // blockquotes
    /^[-*_]{3,}\s*$/m,               // horizontal rules
    /^\|.+\|.+\|/m,                  // tables
    /^-{3,}$/m,                      // frontmatter/separator
  ];

  let score = 0;
  for (const pattern of patterns) {
    if (pattern.test(text)) score++;
  }

  const lines = text.split("\n").filter(Boolean).length;
  return score >= 2 || (score >= 1 && lines > 1);
}

const PASTE_ALLOWED_TAGS = [
  "p", "br", "b", "strong", "i", "em", "u", "s",
  "ul", "ol", "li",
  "blockquote", "pre", "code",
  "table", "thead", "tbody", "tr", "th", "td",
  "h1", "h2", "h3", "h4", "h5", "h6",
  "a", "img", "hr",
  "div", "sub", "sup",
];

const PASTE_ALLOWED_ATTR = [
  "href", "src", "alt", "target", "rel",
  "colspan", "rowspan",
];

function cleanPastedHtml(html) {
  const doc = new DOMParser().parseFromString(html, "text/html");

  removeWordGarbage(doc);
  normalizeGoogleDocs(doc);
  normalizeAIDivs(doc);
  removeEmptyNodes(doc);

  return DOMPurify.sanitize(doc.body.innerHTML, {
    ALLOWED_TAGS: PASTE_ALLOWED_TAGS,
    ALLOWED_ATTR: PASTE_ALLOWED_ATTR,
  });
}

function removeWordGarbage(doc) {
  doc.querySelectorAll("*").forEach(el => {
    const cls = el.className || "";
    if (cls.includes("Mso") || el.tagName === "O:P") {
      el.removeAttribute("class");
      el.removeAttribute("style");
    }

    if (el.hasAttribute("style")) {
      const cleaned = el.getAttribute("style")
        .split(";")
        .filter(rule => {
          const r = rule.trim().toLowerCase();
          return !(
            r.startsWith("mso-") ||
            r.includes("font-family") ||
            r.includes("font-size") ||
            r.includes("line-height")
          );
        })
        .join(";");

      if (cleaned.trim()) {
        el.setAttribute("style", cleaned);
      } else {
        el.removeAttribute("style");
      }
    }
  });
}

function normalizeGoogleDocs(doc) {
  doc.querySelectorAll("span").forEach(span => {
    span.replaceWith(...span.childNodes);
  });
}

function normalizeAIDivs(doc) {
  doc.querySelectorAll("div").forEach(div => {
    const hasBlockChild = div.querySelector(
      "p, h1, h2, h3, h4, h5, h6, ul, ol, li, table, blockquote, pre"
    );
    if (!hasBlockChild && div.children.length > 0) {
      const p = doc.createElement("p");
      while (div.firstChild) {
        p.appendChild(div.firstChild);
      }
      div.replaceWith(p);
    }
  });
}

function removeEmptyNodes(doc) {
  doc.querySelectorAll("*").forEach(el => {
    if (["IMG", "BR", "HR"].includes(el.tagName)) return;
    if (el.textContent.trim() || el.children.length) return;
    el.remove();
  });
}

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

function loadScript(src) {
  return new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[src="${src}"]`);
    if (existing) {
      if (existing.dataset.loaded === "true") return resolve();
      existing.addEventListener("load", resolve);
      existing.addEventListener("error", reject);
      return;
    }
    const script = document.createElement("script");
    script.src = src;
    script.dataset.loaded = "false";
    script.onload = () => { script.dataset.loaded = "true"; resolve(); };
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

function loadStyle(href) {
  return new Promise((resolve, reject) => {
    const existing = document.querySelector(`link[href="${href}"]`);
    if (existing) return resolve();
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = href;
    link.onload = resolve;
    link.onerror = reject;
    document.head.appendChild(link);
  });
}
