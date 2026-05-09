VitaMotus.earth Project Vision Guide - May 2026
VitaMotus.earth
Project Vision Guide - Developer Handoff
Mission Statement
VitaMotus.earth is a calm, educational spider archive designed to help visitors 
understand how spiders are classified, how their bodies are built, where they live, 
and why they matter. The first build should start with spiders only and should be 
structured around a clear taxonomy backbone: Family -> Genus -> Species. From my 
end, the main data input will be a database where each species record carries its 
family, genus, scientific name, common name where reliable, authority, year, 
distribution, habitat, size, behaviour, venom note, conservation status, interesting 
fact, photo credits, and references.
The developer should understand VitaMotus as a living archive, not a fixed 
brochure. The website must allow the database to grow over time as new species 
profiles are added, corrected, sourced, and enriched.
Taxonomy input from my end
The core database begins with all spider 
families, the genera under each family, and 
the species under each genus. This must 
drive browse pages, search, filters, and 
individual species profiles.
Species of the Day dynamic card
The homepage should show a dynamic 
Species of the Day card that changes every 
24 hours from the databank. It should 
display the scientific name, common name, 
image, family, distribution, habitat, and 
one short interesting note.
Individual species viewing card
Every species should have its own clean 
profile page using a fixed standard: 
scientific name, common name, family, 
genus, authority, year described, 
distribution, habitat, size, behaviour, 
venom note, conservation status, 
interesting fact, photo credits, and 
references.
Spider anatomy and terminology
The site should include learning pages for 
spider anatomy and terminology. These 
pages should explain terms such as 
cephalothorax/prosoma, 
abdomen/opisthosoma, pedipalps, 
chelicerae, fangs, spinnerets, book lungs, 
eyes, and legs in beginner-friendly 
language.
0. Document Flow
This guide is organised so a developer can move from purpose, to design, to pages, 
to data, to implementation. Every heading starts on a fresh page for clean review 
and printing.
 1. Core Vision and Scope
 2. Visual Identity and Website Look
 2A. Homepage Direction
 3. Website Structure and Public Pages
 4. Species Page Standard Template
 4A. Alternative Species Layouts
 5. Taxonomy and Database Backbone
 6. Complete Spider Family Summary - All 138 Records
 7. Growth Phases
 8. Developer Build Notes and Physical File Index
VitaMotus.earth Project Vision Guide - May 2026
VitaMotus.earth Project Vision Guide - May 2026
1. Core Vision and Scope
VitaMotus should feel like a living natural-history archive: beginner-friendly, 
scientifically respectful, visually beautiful, and useful as a growing spider database.
 Start with spiders only. The first public identity should be focused and not 
diluted across all animals.
 Build the site around a taxonomy skeleton: Family -> Genus -> Species.
 Make every species page expandable, so a basic taxonomy placeholder can later 
grow into a full educational profile.
 Write for serious hobbyists, students, nature lovers, and visitors who are curious 
but not academic specialists.
 Use simple language, but keep scientific names, sources, and taxonomy standards 
visible.
Area Direction
Primary goal
Create a clean spider archive where 
visitors can browse families, genera, and 
species.
Learning goal
Explain anatomy, taxonomy, terminology, 
behaviour, habitats, venom notes, and 
conservation in a calm way.
Content rhythm
Allow 10-20 species records to be enriched 
over time as reading, sourcing, and photo 
permissions improve.
Tone Natural-history field guide: educational, 
warm, precise, and non-horror.
2. Visual Identity and Website Look
The real generated mockups below are the design north star. They show that 
VitaMotus should look like a polished field-guide website, not a horror spider page 
or a plain database.
Visual identity board: colour palette, typography, mood keywords, and desktop/mobile direction.
VitaMotus.earth Project Vision Guide - May 2026
Website look and feel reference: living archive layout, field guide cards, anatomy panel, recent 
observations, and newsletter area.
Colour role
Use
Warm Parchment
#F4EAD7 - main background
Forest Ink
#10231B - text, headings, footer
Moss Green
#496B4A - primary buttons and links
Clay Brown
#8A5A3C - habitat labels and accents
Amber Silk
#D9A441 - highlights and Species of the Day
Fern Mist
#DDE8D5 - soft panels and taxonomy chips
VitaMotus.earth Project Vision Guide - May 2026
2A. Homepage Direction
The homepage must immediately explain the archive and give visitors clear entry 
points into taxonomy, species cards, anatomy, and spider learning.
Homepage direction: hero message, Species of the Day card, search bar, taxonomy chips, and four public 
learning sections.
 Hero message: explain that VitaMotus explores how spiders are built, behave, 
and belong in nature.
 Primary actions: Browse species and Learn anatomy.
 Dynamic Species of the Day card: selected from the database every 24 hours.
 Search: allow search across species, genera, families, habitat, and distribution.
 Section cards: Browse Families, Spider Directory, Learn Spider Anatomy, Learn 
Spider Taxonomy.
VitaMotus.earth Project Vision Guide - May 2026
VitaMotus.earth Project Vision Guide - May 2026
3. Website Structure and Public Pages
The site should be navigable before every species profile is complete. A visitor 
should be able to browse the taxonomy skeleton from day one and later find richer 
profiles as they are added.
Public page / module Developer meaning
What is VitaMotus?
Introductory page explaining the archive, 
the spider-only starting phase, and the 
educational mission.
Start with spiders
A beginner page explaining what spiders 
are and how they differ from insects and 
other arthropods.
Browse Families
List all spider families. Each family page 
should show accepted genera and species 
counts and a list of genera.
Browse Genera
List genera alphabetically and by family. 
Each genus page should show species 
under that genus.
Browse Species
Searchable species index with filters for 
family, genus, distribution, habitat, status, 
and profile completeness.
Species of the Day Dynamic homepage and archive module 
that highlights one species every 24 hours.
Learn Spider Anatomy Interactive or illustrated page explaining 
external and internal anatomy terms.
Learn Spider Taxonomy
Beginner explanation of order, family, 
genus, species, authority, year, and 
changing scientific names.
Recommended public routes: /, /about, /families, /family/{family-name}, /genera, 
/genus/{genus-name}, /species, /species/{scientific-name}, /anatomy, /taxonomy, 
/species-of-the-day.
VitaMotus.earth Project Vision Guide - May 2026
4. Species Page Standard Template
Every species page should use the same standard data structure so that VitaMotus 
remains consistent, searchable, and easy to maintain.
Species-card field What it should contain
Scientific name Full scientific binomial, for example 
Poecilotheria metallica.
Common name Reliable common name or names, when 
available.
Family Scientific family name, for example 
Theraphosidae.
Genus Genus name, for example Poecilotheria.
Authority / described by Person who described the species.
Year described Year the species was described.
Distribution Known country/region distribution.
Habitat
Natural habitat, such as dry deciduous 
forest, leaf litter, tree hollows, grassland, 
caves, etc.
Size Body size or leg span where reliable.
Behaviour
Key behaviour such as arboreal, 
burrowing, web-building, nocturnal, fast
moving, social/solitary.
Venom note Simple, responsible note on venom/medical 
relevance. No sensational language.
Conservation status IUCN or other status if available; otherwise 
data deficient / not evaluated / unknown.
Interesting fact One memorable fact that helps the visitor 
connect with the species.
Photo credits / source
Photographer, license, source URL, or 
placeholder until permission is obtained.
References
World Spider Catalog, papers, books, IUCN, 
regional sources, and other references 
used.
Species page look and feel: high-impact image panel, conservation banner, overview table, image credits, 
and references.
VitaMotus.earth Project Vision Guide - May 2026
4A. Alternative Species Layouts
These mockups show alternate species page structures. The exact visual layout can 
change, but the standard fields must stay consistent.
Alternative species layout: wide hero image, side gallery, structured overview card, conservation badge, 
photo credits, and references.
VitaMotus.earth Project Vision Guide - May 2026
Additional species-card direction: split visual and data treatment for a high-impact profile page.
 Option 1: editorial profile with large left image and right-side data table.
 Option 2: wide hero image followed by structured cards and habitat/detail image 
panels.
 Option 3: compact species card for database browsing, linking to the full profile.
VitaMotus.earth Project Vision Guide - May 2026
5. Taxonomy and Database Backbone
The first version should be a structured spider taxonomy archive, not a loose 
collection of isolated pages. The clean backbone is Family -> Genus -> Species.
Full site system reference: homepage, field guide areas, species cards, anatomy panel, and source-backed 
records.
Database layer
Developer meaning
Family table
Stores family_id, family_name, authority, 
year_described, accepted_genus_count, 
accepted_species_count, source, 
last_checked_date, notes.
Genus table
Stores genus_id, family_id, genus_name, 
authority, year_described, 
accepted_species_count, source, 
last_checked_date, notes.
VitaMotus.earth Project Vision Guide - May 2026
Species table
Stores species_id, family_id, genus_id, 
scientific_name, genus_name, 
species_epithet, authority, year_described, 
distribution, profile_status, source, 
last_checked_date, notes.
Public views
Tree view for relationships, table view for 
search/filter, card view for normal visitors.
Admin import
Accept CSV/XLSX where one row equals 
one species. Family and genus pages should 
be generated from the species records.
Phase 1 should prioritise a reliable import and display system over decorative 
complexity. Once the skeleton exists, each species can gradually become a full 
educational profile.
VitaMotus.earth Project Vision Guide - May 2026
VitaMotus.earth Project Vision Guide - May 2026
6. Complete Spider Family Summary - All 138 
Records
This table replaces the earlier species-count order list. It is alphabetical by family 
name and must stay complete in the guide. Columns: serial number, family, 
accepted genera count, accepted species count.
No. Family Accepted genera Accepted species
1 Actinopodidae 3 128
2 Agelenidae 100 1482
3 Amaurobiidae 27 210
4 Anamidae 10 232
5 Anapidae 59 233
6 Ancylometidae 1 10
7 Antrodiaetidae 4 37
8 Anyphaenidae 59 663
9 Araneidae 197 3159
10 Archaeidae 5 93
11 Archoleptonetidae 2 8
12 Argyronetidae 12 74
13 Arkyidae 2 38
14 Atracidae 3 39
15 Atypidae 3 62
16 Austrochilidae 2 9
17 Barychelidae 39 294
18 Bemmeridae 4 52
VitaMotus.earth Project Vision Guide - May 2026
No. Family Accepted genera Accepted species
19 Caponiidae 21 157
20 Cheiracanthiidae 15 385
21 Cicurinidae 4 183
22 Cithaeronidae 2 10
23 Clubionidae 18 683
24 Corinnidae 77 897
25 Ctenidae 48 613
26 Ctenizidae 2 6
27 Cyatholipidae 23 58
28 Cybaeidae 24 308
29 Cycloctenidae 9 81
30 Cyrtaucheniidae 6 109
31 Deinopidae 3 71
32 Desidae 63 324
33 Dictynidae 45 343
34 Diguetidae 2 16
35 Dipluridae 8 155
36 Dolomedidae 7 129
37 Drymusidae 2 19
38 Dysderidae 24 671
39 Entypesidae 7 41
40 Eresidae 9 126
41 Euagridae 14 87
VitaMotus.earth Project Vision Guide - May 2026
No. Family Accepted genera Accepted species
42 Euctenizidae 8 79
43 Filistatidae 18 193
44 Gallieniellidae 5 41
45 Gnaphosidae 154 2500
46 Gradungulidae 8 20
47 Hahniidae 29 244
48 Halonoproctidae 6 150
49 Hersiliidae 16 189
50 Hexathelidae 7 45
51 Hexurellidae 1 8
52 Homalonychidae 1 2
53 Huttoniidae 1 1
54 Hypochilidae 2 33
55 Idiopidae 23 455
56 Ischnothelidae 6 28
57 Lamponidae 23 192
58 Lathyidae 10 58
59 Leptonetidae 22 400
60 Linyphiidae 641 4967
61 Liocranidae 35 358
62 Liphistiidae 8 199
63 Lycosidae 142 2542
64 Macrobunidae 27 95
VitaMotus.earth Project Vision Guide - May 2026
No. Family Accepted genera Accepted species
65 Macrothelidae 7 55
66 Malkaridae 13 57
67 Mecicobothriidae 1 2
68 Mecysmaucheniida
e 7 25
69 Megadictynidae 2 2
70 Megahexuridae 1 1
71 Melloinidae 1 5
72 Microhexuridae 1 2
73 Microstigmatidae 12 44
74 Migidae 11 108
75 Mimetidae 8 167
76 Miturgidae 33 191
77 Myrmecicultoridae 1 2
78 Mysmenidae 17 188
79 Nemesiidae 10 199
80 Nesticidae 16 291
81 Nicodamidae 7 27
82 Ochyroceratidae 9 187
83 Oecobiidae 7 134
84 Oonopidae 115 1984
85 Orsolobidae 30 190
86 Oxyopidae 10 448
VitaMotus.earth Project Vision Guide - May 2026
No. Family Accepted genera Accepted species
87 Pacullidae 4 38
88 Palpimanidae 20 185
89 Paratropididae 6 48
90 Penestomidae 1 9
91 Periegopidae 1 3
92 Philodromidae 31 531
93 Pholcidae 98 2066
94 Phrurolithidae 27 427
95 Physoglenidae 13 72
96 Phyxelididae 14 68
97 Pimoidae 2 87
98 Pisauridae 45 235
99 Plectreuridae 2 32
100 Porrhothelidae 1 6
101 Prodidomidae 24 197
102 Psechridae 2 66
103 Psilodercidae 10 231
104 Pycnothelidae 15 146
105 Rhytidicolidae 2 16
106 Salticidae 695 6960
107 Scytodidae 4 263
108 Segestriidae 5 181
109 Selenopidae 9 282
VitaMotus.earth Project Vision Guide - May 2026
No. Family Accepted genera Accepted species
110 Senoculidae 1 31
111 Sicariidae 3 177
112 Sparassidae 99 1569
113 Stasimopidae 1 56
114 Stenochilidae 2 13
115 Stiphidiidae 20 125
116 Symphytognathida
e 10 112
117 Synaphridae 3 13
118 Synotaxidae 5 40
119 Telemidae 16 113
120 Tetrablemmidae 27 154
121 Tetragnathidae 45 997
122 Theraphosidae 189 1194
123 Theridiidae 138 2623
124 Theridiosomatidae 24 182
125 Thomisidae 172 2198
126 Titanoecidae 5 67
127 Toxopidae 14 82
128 Trachelidae 30 322
129 Trachycosmidae 20 148
130 Trechaleidae 18 136
131 Trochanteriidae 6 51
No.
Family
Accepted genera
Accepted species
132
Trogloraptoridae
1
1
133
Udubidae
6
58
134
Uloboridae
20
284
135
Viridasiidae
3
14
136
Xenoctenidae
4
33
137
Zodariidae
90
1326
138
Zoropsidae
28
186
Footnote: Family names and species names use Latin scientific names. Where reliable, common 
English names can also be added for easier public understanding.
VitaMotus.earth Project Vision Guide - May 2026
VitaMotus.earth Project Vision Guide - May 2026
7. Growth Phases
Build a useful skeleton first, then enrich it steadily without losing quality control.
Phase What to build
Phase 1 - Taxonomy skeleton Build Family -> Genus -> Species pages. No 
long species write-ups required yet.
Phase 2 - Basic species profiles
Add common names where reliable, 
authority, year, distribution, habitat, size, 
behaviour, venom note, conservation 
status, references.
Phase 3 - Rich profiles
Add photos, range maps, identification 
notes, similar species, web type/hunting 
style, reproduction, and field notes.
Phase 4 - Hobbyist explanation layer
Add simple explanations: how to recognise 
it, where it is found, whether it is 
dangerous, and what makes it interesting.
Phase 5 - Interactive learning
Develop interactive spider anatomy, 
glossary, taxonomy visualisations, and 
beginner learning paths.
VitaMotus.earth Project Vision Guide - May 2026
8. Developer Build Notes and Physical File Index
Use this section as the handoff checklist for the developer and as the index for the 
new physical project file.
Build note Requirement
Backend source of truth
Relational database or structured CMS 
content model. Species row is the core 
record.
Import requirement
Developer should support CSV/XLSX import 
for family, genus, species, counts, status, 
source, and notes.
Dynamic Species of the Day
Cron/scheduled logic or server function 
chooses one species every 24 hours from 
eligible species records.
Profile status
Every species should have profile_status: 
pending, basic, draft, reviewed, or 
complete.
Citation fields Every taxonomic record should support 
source and last_checked_date.
Image permissions
Public pages must use owned, licensed, 
permission-based, or properly credited 
images only.
 Physical file tab 1: Mission statement and website scope.
 Physical file tab 2: Website look and feel images.
 Physical file tab 3: Homepage and public page structure.
 Physical file tab 4: Species page standard template.
 Physical file tab 5: Anatomy and terminology ideas.
 Physical file tab 6: Taxonomy and database structure.
 Physical file tab 7: Alphabetical family summary - all 138 records.
 Physical file tab 8: Developer notes, future phases, and pending questions.