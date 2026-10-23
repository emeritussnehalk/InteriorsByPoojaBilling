const MARKER = "POOJA_INTERIOR_LEDGER_V1:";
const money = new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 });
const tabIds = ["detailsPanel", "itemsPanel", "termsPanel", "reviewPanel", "summaryPanel"];
const pdfScripts = [
  { key: "jspdf", src: "https://cdn.jsdelivr.net/npm/jspdf@2.5.1/dist/jspdf.umd.min.js", ready: () => Boolean(window.jspdf?.jsPDF) },
  { key: "autotable", src: "https://cdn.jsdelivr.net/npm/jspdf-autotable@3.8.2/dist/jspdf.plugin.autotable.min.js", ready: () => Boolean(window.jspdf?.jsPDF?.API?.autoTable) },
  { key: "pdf-lib", src: "https://cdn.jsdelivr.net/npm/pdf-lib@1.17.1/dist/pdf-lib.min.js", ready: () => Boolean(window.PDFLib?.PDFDocument) }
];
const areaOptions = [
  "Balcony",
  "Bar Unit",
  "Bathroom",
  "Bay Window Area",
  "Bed Back Wall",
  "Bedroom",
  "Bedroom 1",
  "Bedroom 2",
  "Bedroom 3",
  "Bedroom 4",
  "Bedroom Balcony",
  "Ceiling Area",
  "Civil Work",
  "Common Bathroom",
  "Console Area",
  "Corridor",
  "Crockery Area",
  "Curtain and Blinds",
  "Custom Furniture",
  "Deck Area",
  "Dining Area",
  "Dining Back Wall",
  "Dressing Area",
  "Dry Balcony",
  "Dry Kitchen",
  "Electrical Work",
  "Entertainment Room",
  "Entrance Door Area",
  "Entrance Lobby",
  "False Ceiling",
  "Family Room",
  "Formal Living Room",
  "Foyer Area",
  "Gaming Room",
  "Garden Area",
  "Glass Work",
  "Grandparents Bedroom",
  "Grandparents Bedroom Bathroom",
  "Grill Work",
  "Guest Bedroom",
  "Guest Bedroom Bathroom",
  "Guest Bedroom Wardrobe Area",
  "Gym Area",
  "Home Office",
  "Home Theatre",
  "Informal Living Room",
  "Kids Bedroom",
  "Kids Bedroom Bathroom",
  "Kids Play Area",
  "Kids Study Area",
  "Kitchen",
  "Kitchen Platform Area",
  "Laundry Area",
  "Library",
  "Lighting Area",
  "Living Balcony",
  "Living Room",
  "Loft Area",
  "Loose Furniture",
  "Lounge Area",
  "Maid Bathroom",
  "Maid Room",
  "Mandir Area",
  "Master Bedroom",
  "Master Bedroom Bathroom",
  "Master Bedroom Dressing Area",
  "Master Bedroom Walk-in Wardrobe",
  "Open Kitchen",
  "Other",
  "Other Items",
  "Painting Work",
  "Pantry",
  "Parents Bedroom",
  "Parents Bedroom Bathroom",
  "Partition Area",
  "Passage",
  "Patio",
  "Plumbing Work",
  "Powder Room",
  "Puja Room",
  "Reception Area",
  "Servant Bathroom",
  "Servant Room",
  "Sofa Back Wall",
  "Storage Area",
  "Store Room",
  "Study Room",
  "Terrace",
  "Toilet",
  "TV Unit Area",
  "Utility",
  "Utility Balcony",
  "Verandah",
  "Walk-in Wardrobe",
  "Wall Panelling",
  "Wardrobe Area",
  "Wash Basin Area",
  "Wet Kitchen",
  "Window Seating Area",
  "Yoga Room"
];
const itemOptions = [
  "AC Point",
  "Accent Wall",
  "Acrylic Panel",
  "Artificial Grass",
  "Balcony Grill",
  "Bar Unit",
  "Bathroom Mirror Cabinet",
  "Bathroom Niche",
  "Bathroom Tall Storage",
  "Bathroom Vanity",
  "Bay Window Seating",
  "Bed",
  "Bed Back Cushion",
  "Bed Back Panelling",
  "Bed Side Panel",
  "Bed Side Table",
  "Blackout Curtains",
  "Blinds",
  "Bookshelf",
  "Bottle Pullout",
  "Breakfast Counter",
  "Bunk Bed",
  "Cane Shutter",
  "Ceiling Border",
  "Ceiling Cove",
  "Ceiling Rafters",
  "Center Table",
  "Chandelier",
  "Charcoal Panel",
  "Chest of Drawers",
  "Chimney Panel",
  "Civil Work",
  "Cleaning and Handover",
  "Computer Table",
  "Console Unit",
  "Cove Light",
  "Crockery Counter",
  "Crockery Tall Unit",
  "Crockery Unit",
  "Curtain Channel",
  "Curtain Pelmet",
  "Curtain Rod",
  "Custom Item",
  "Cutlery Tray",
  "DB Box Cover",
  "Debris Transport and Dumping",
  "Deck Flooring",
  "Decorative Partition",
  "Deep Cleaning",
  "Digital Lock",
  "Dining Back Wall",
  "Dining Bench",
  "Dining Chairs",
  "Dining Table",
  "Dishwasher Panel",
  "Display Niche",
  "Display Unit",
  "Door Frame Panelling",
  "Door Handle",
  "Door Polish",
  "Dressing Mirror",
  "Dressing Table",
  "Dustbin Pullout",
  "Electrical Point Shifting",
  "Enamel Paint",
  "Exhaust Fan Panel",
  "Fabric Panelling",
  "False Ceiling",
  "Fan Hook Cutout",
  "Feature Wall",
  "File Storage Unit",
  "Floating Shelf",
  "Fluted Glass Shutter",
  "Fluted Panel",
  "Full Height Wardrobe",
  "Glass Partition",
  "Glass Shutter Cabinet",
  "Grain Trolley",
  "Granite Work",
  "Grid Ceiling",
  "Grill Door",
  "Gypsum Ceiling",
  "Gypsum Partition",
  "Hanging Light",
  "Headboard",
  "Hob Unit",
  "Hydraulic Bed",
  "Inverter Box",
  "Invisible Grill",
  "King Size Bed",
  "Kitchen Appliance Unit",
  "Kitchen Backsplash",
  "Kitchen Base Cabinets",
  "Kitchen Base Unit",
  "Kitchen Corner Unit",
  "Kitchen Loft",
  "Kitchen Overhead Cabinet",
  "Kitchen Pantry Unit",
  "Kitchen Tall Unit",
  "Kitchen Trolley",
  "Kitchen Wall Cabinets",
  "L Corner",
  "Laminate Panel",
  "LAN Point",
  "LED Strip",
  "Light Patti",
  "Loft",
  "Louvers Panelling",
  "Magic Corner",
  "Main Door Laminate",
  "Main Door Panelling",
  "Mandir Bell Panel",
  "Mandir Drawer",
  "Mandir Jali",
  "Mandir Storage",
  "Mandir Unit",
  "Marble Sheet Panel",
  "MDF Molding Panelling",
  "Microwave Unit",
  "Mirror",
  "Mirror Panelling",
  "Mirror with LED",
  "Mosquito Mesh",
  "MS Partition",
  "Nested Table",
  "New Electrical Point",
  "Oil Pullout",
  "Open Display Shelf",
  "Openable Wardrobe",
  "Oven Unit",
  "Overhead Storage",
  "Paint",
  "Panel Light",
  "Partition",
  "Pendant Light",
  "Planter Box",
  "Plate Rack",
  "Platform Bed",
  "Plumbing Point",
  "Plywood Partition",
  "Polish",
  "POP Ceiling",
  "Prayer Back Panel",
  "Primer",
  "Profile Light",
  "Profile Patti",
  "Puja Unit",
  "PVC Ceiling",
  "Quartz Countertop",
  "Queen Size Bed",
  "Reeded Glass Partition",
  "Refrigerator Panel",
  "Roller Blinds",
  "Roman Blinds",
  "Router Shelf",
  "S Corner",
  "Safety Door",
  "Sensor Light",
  "Sheer Curtains",
  "Shoe Rack",
  "Shoe Rack with Seat",
  "Showcase Unit",
  "Shower Glass Partition",
  "Shower Partition",
  "Side Table",
  "Single Bed",
  "Sink Unit",
  "Sitting Bench",
  "Skirting Drawer",
  "Sliding Door Track",
  "Sliding Wardrobe",
  "Sofa",
  "Sofa Back Wall",
  "Sofa Cum Bed",
  "Spot Light",
  "Stone Cladding",
  "Storage Bed",
  "Storage Under Sink",
  "Study Back Panel",
  "Study Bookshelf",
  "Study Drawer Unit",
  "Study Table",
  "Study Table with Overhead Storage",
  "Switch Board Shifting",
  "Switch Socket",
  "Tall Pantry Pullout",
  "Texture Paint",
  "Thali Basket",
  "Tile Work",
  "Towel Rack",
  "Toy Storage",
  "Track Light",
  "Trundle Bed",
  "TV Back Panel",
  "TV Point",
  "TV Storage Unit",
  "TV Unit",
  "Under Bed Storage",
  "Under Sink Cabinet",
  "Vanity Counter",
  "Veneer Panel",
  "Walk-in Wardrobe",
  "Wall Light",
  "Wall Panelling",
  "Wall Putty",
  "Wall Shelf",
  "Wallpaper Panelling",
  "Wardrobe",
  "Wardrobe Hanger Rod",
  "Wardrobe Internal Drawers",
  "Wardrobe Loft",
  "Wardrobe Mirror Shutter",
  "Wardrobe Shutter",
  "Wash Basin Cabinet",
  "Waterproofing",
  "Wicker Basket",
  "Window Grill",
  "Window Seating",
  "Wooden Ceiling",
  "Wooden Partition",
  "Work Desk",
  "WPC Panel"
];

const blankData = () => ({
  meta: {
    clientName: "",
    projectAddress: "",
    phone: "",
    quoteDate: "",
    companyName: "Interiors by Pooja",
    gstin: "",
    companyPhone: "8483846288",
    email: "",
    officeAddress: "Que914, C-1802, Keshav Nagar, Mundhwa, Pune, Maharashtra 411036",
    website: "",
    designerFeePercent: 6
  },
  sections: [
    { id: uid(), name: "", rows: [blankRow()] }
  ],
  materials: "",
  slabs: [
    { id: uid(), title: "", description: "", percent: "" }
  ]
});

const sampleData = () => ({
  meta: {
    clientName: "Satish Kumar",
    projectAddress: "KESHAV NAGAR",
    phone: "",
    quoteDate: "2026-10-11",
    companyName: "Interiors by Pooja",
    gstin: "",
    companyPhone: "8483846288",
    email: "",
    officeAddress: "Que914, C-1802, Keshav Nagar, Mundhwa, Pune, Maharashtra 411036",
    website: "",
    designerFeePercent: 6
  },
  sections: [
    section("Foyer Area", [
      row("SHOE RACK", "IN 18 MM PLY AND 1 MM LAMINATE SHOE RACK WITH 2 DRAWERS", 3, 3.6, 1300),
      row("SITTING NEAR SHOE RACK", "IN PLY AND LAMINATE WITH STORAGE BELOW", 2, 1.8, 1300),
      row("SAFTY DOOR", "IN 25 MM BLOCK BOARD AND 1 MM LAMINATE WITH MS POWDER CATED JALI WITH DESIGNER HANDLE, EUROPA LATCH LOCK", 3.6, 7.2, 1200),
      row("PANALLING AROUND SAFTY DOOR", "IN 12 MM PLY AND LAMINATE AS PER DESIGN", 6, 9, 600)
    ]),
    section("Living Room", [
      row("CONSOLE UNIT", "IN 18 MM PLY AND 1 MM LAMINATE SHOE RACK WITH 2 DRAWERS", 5, 3.6, 1300),
      row("PANALLING ABOVE CONSOLE UNIT", "IN 12 MM PLY AND LAMINATE WITH WALLPAPER AND MDF MOLDING PANALLING", 5, 6, 600),
      row("TV UNIT", "IN 18 MM PLY AND 1 MM LMINATE WITH LIUVERS AND SHOWCASE BOX (VERY MINIMAL)", 8, 8.9, 1100),
      row("MANDIR BESIDES TV UNIT", "IN 18 MM PLY AND 1 MM LAMINATE WITH ACRYLIC JALI AND ACRYLIC DESIGN BEHIND(DOORS AND SITTING NOT INCLUDED)", 2.6, 7.6, 1600),
      fixedRow("SOFA", "IN PINE WOOD FRAME AND BRANDED FAABRIC AND 45 DENSITY FOAM (CUSTOM COUTCH BRAND) 5 SEATER", 60000),
      row("SOFA BACK WALL", "IN PLY AND LAMINATE WITH MDF MOLDINGS AND WALLPAPER", 10, 9, 400)
    ]),
    section("Dining Area", [
      fixedRow("DINING TABLE(4 SEATER)", "DINING ATBLE MADE BY CARPENTER WITH LAMINATED TOP AND READYMADE CHAIRS", 56000),
      row("DINING BACK WALL", "IN PLY AND LAMINATE WITH MDF MOLDINGS AND WALLPAPER", 5, 9, 500)
    ]),
    section("Kitchen", [
      row("WALL CABINETS", "IN 18 MM BWP PLY AND 1 MM INTERNAL LAMINATES AND 1.5 MM ACRYLIC FACTORY FINISHED DOORS", 15, 2.6, 1600),
      row("LOFT (L SHAPE)", "IN 18 MM BWP PLY AND 1 MM INTERNAL LAMINATES AND 1.5 MM ACRYLIC FACTORY FINISHED DOORS", 20, 2, 1600)
    ]),
    section("Master Bedroom", [
      row("BED", "IN 18 MM PLY AND 1 MM LAMINATE WITH HYDRAULIC TOP WITH STORAGE", 6, 6.6, 1100),
      row("BED BACK CUSHION", "IN FOAM AND FABRIC CUSHION IN SELECTED DESIGN", 6, 2.6, 600),
      row("BED BACK PANALLING", "IN PLY AND LAMINATE WITH MDF MOLDINGS AND WALLPAPER DESIGN AS PER SELECTION (PRICE CAN VARY)", 9, 8, 500),
      row("WARDROBE", "IN 18 MM PLY AND 1 MM LAMINATE WITH OPENABLE OR SLIDING DOORS WITH HANGER RODS INSIDE, 4 DRAWERS INSIDE", 7, 9, 1600),
      row("STUDY TABLE WITH OVERHEAD STORAGE", "IN 18 MM PLY AND 1 MM LAMINATE WITH WRITING BOARD", 3, 7, 1300),
      row("DRESSING TABLE", "IN PLYN AND LAMINATE WITH STORAGE AND FULL SIZE MIRROR AND 2 DRAWERS", 2, 7, 1600),
      fixedRow("SIDE TABLE", "IN PLY AND LAMINATE WITH 2 DRAWERS", 6000)
    ]),
    section("Master Bedroom Bathroom", [
      row("GLASS PARTITION", "10 MM TOUGHNED GLASS PARTITION", 2.6, 7, 600),
      row("PVC CEILING", "PVC CEILING IN BATHROOM", 8, 4.6, 160),
      row("STORAGE UNDER SINK", "IN PVC PLY AND LAMINATE", 2, 2, 1500),
      fixedRow("MIRROR", "MIRROR WITH ALLUMINIUM FRAME WITH LED LIGHT", 5000)
    ]),
    section("Guest Bedroom", [
      row("BED", "18 MM PLY AND 1 MM LAMINATE BED WITH HYDROLIC STORAGE", 5, 6.6, 1100),
      row("BED BACK CUSHION", "IN FOAM AND FABRIC CUSHION IN SELECTED DESIGN", 5, 2.6, 600),
      row("BED BACK PANALLING", "IN PLY AND LAMINATE WITH MDF MOLDINGS AND WALLPAPER DESIGN AS PER SELECTION (PRICE CAN VARY)", 9, 8, 500),
      row("WARDROBE", "IN 18 MM PLY AND 1 MM LAMINATE WITH OPENABLE OR SLIDING DOORS WITH HANGER RODS INSIDE, 4 DRAWERS INSIDE", 6, 9, 1600),
      row("STUDY TABLE WITH OVERHEAD STORAGE", "IN 18 MM PLY AND 1 MM LAMINATE WITH WRITING BOARD", 3, 7, 1300),
      row("DRESSING TABLE", "IN PLYN AND LAMINATE WITH STORAGE AND FULL SIZE MIRROR AND 2 DRAWERS", 2, 7, 1600),
      fixedRow("SIDE TABLE", "IN PLY AND LAMINATE WITH 2 DRAWERS", 6000)
    ]),
    section("Kids Bedroom", [
      row("SOFA CUM BED", "FOLDABLE SOFA CUM BED IN PLY AND LAMINATE", 5, 6.6, 1200),
      row("WARDROBE", "IN 18 MM PLY AND 1 MM LAMINATE WITH SLIDING DOORS OR OPENABLLE DOORS WITH 4 DRAWERS AND HANGER RODS", 6, 9, 1600),
      row("BED BACK CUSHION", "IN FOAM AND FABRIC CUSHION IN SELECTED DESIGN", 5, 2.6, 600),
      row("DRESSING TABLE", "IN PLYN AND LAMINATE WITH STORAGE AND FULL SIZE MIRROR AND 2 DRAWERS", 2, 7, 1600),
      fixedRow("SIDE TABLE", "IN PLY AND LAMINATE WITH 2 DRAWERS", 6000)
    ]),
    section("Common Bathroom", [
      row("GLASS PARTITION", "10 MM TOUGHNED GLASS PARTITION", 2.6, 7, 600),
      row("PVC CEILING", "PVC CEILING IN BATHROOM", 8, 4.6, 160),
      row("STORAGE UNDER SINK", "IN PVC PLY AND LAMINATE", 2, 2, 1500),
      fixedRow("MIRROR", "MIRROR WITH ALLUMINIUM FRAME WITH LED LIGHT", 5000)
    ]),
    section("Other Items", [
      { id: uid(), item: "FALSE CEILING", spec: "POP IN GYPROC GYPSUM SHEET WITH PREMIUM QUALITY CAHNNEL", width: "", height: "", sqft: 1122, rate: 80, amount: 89760 },
      row("INVERTER BOX", "MS GRILL AT BASE WITH PLY COVERING AND 1 MM LAMINATE FINISHED WITH JALI FOR VENTILATION", 4, 2.3, 1400),
      { id: uid(), item: "INVISIBLE GRILL", spec: "2 MM THICKNESS WITH 2.5 INCH GAP INVISIBLE GRILL 95 SQFT", width: "", height: "", sqft: 95, rate: 140, amount: 13300 },
      { id: uid(), item: "ELECTRIC POINT SHIFTNIG", spec: "ELECTRIC POINTS SHIFTING FOR FALSE CEILING AND FURNITURE (POINTS CAN VARY AS PER REQUIREMENT)", width: "", height: "", sqft: 80, rate: 800, amount: 64000 },
      fixedRow("LIGHTS,LEDS, CHOKE, SPOT LIGHTS, PROFILE LIGHTS", "LIGHTS COST LIKE SPOT LIGHT, PROFILE LIHGHTS, PANAL LIGHTS OF BRAND ORIENT OR BAJAJ, LED", 45000),
      fixedRow("SWITCH SOCKET FOR EXTRA LIGHTS POINT", "EXTRA SWITCH AND SOCKETS FOR EXTRA LIGHT POINTS EXCEPT EXISTING SWITCH SOCKETS", 14000),
      fixedRow("DEBRIES TRANSPORT AND DUMPING", "", 12000),
      fixedRow("DEEP CLEANING", "", 8000),
      fixedRow("PAINT", "ASIAN PAINT LUSTER WITH 2 COAT PUTTI, 2 COAT PRIMER AND 2 COAT PAINT", 85000)
    ])
  ],
  materials: "All material used by us is ISI trademarked.\nPly wood /Blockboard - 18mm alternate gurjan plywood for furniture work, 18mm BWR plywood for all kitchen work.\nLaminate - 1mm thickness laminate to be used for furniture. Standard laminate rate for outside laminates of Rs.1800 to 2200 per sheet has been considered (1 mm laminate considered to all furniture) premium fluted, smooth finish, stone finish, self design laminates will be used.\nAdditional accessories as well as light fittings have not been included in the quote.\nAll hinges are soft closure for kitchen, living, dinning, entry passage, others unit like overhead loft storage. ONYX (NON SOFT CLOSE) drawers channals will be used.\nPREMIUM EMULSION paint of asian paint to be used for all walls AND premium emulsion for CEILING.\nHardware and Hinges - ONYX(soft close) for hinges.\nEuropa for wardrobe locks.\nThe interior work included edge binding to give better finish.\nLaminates inside are white / off white/ fabric finish of 1 mm thickness.",
  slabs: [
    { id: uid(), title: "ADVANCE", description: "This is for design phase", percent: "50,000" },
    { id: uid(), title: "1ST SLAB", description: "In this slab all pop work will be finish, plywood, internal laminate, fevicol and basic hardware will be deliverd on site and pasting of laminate will be done", percent: 30 },
    { id: uid(), title: "2ND SLAB", description: "In this slab all carcus work will be finished, and hardware like hinges, chanells will be deliverd on site, civil work will be done", percent: 25 },
    { id: uid(), title: "3 RD SLAB", description: "In this slab all kitchen material order will be places, all color laminate, bed fittings, warddrobe fittings will be deliverd on site and laminate work will start", percent: 25 },
    { id: uid(), title: "4TH SLAB", description: "In this slab all color laminate work finish, all pending works", percent: 15 },
    { id: uid(), title: "5TH SLAB", description: "This slab is after handover, design cost will minimise from this slab", percent: 5 },
    { id: uid(), title: "TOTAL", description: "", percent: 100 }
  ]
});

let data = blankData();
let sampleLoaded = false;
let activeSectionId = "";
let hasUnsavedChanges = false;

function markUnsavedChanges() {
  hasUnsavedChanges = true;
}

window.addEventListener("beforeunload", (event) => {
  if (!hasUnsavedChanges) return;
  event.preventDefault();
  // Modern browsers show their own standard confirmation message here.
  event.returnValue = "";
});

document.addEventListener("DOMContentLoaded", () => {
  bindMeta();
  bindActions();
  bindTabs();
  renderAll();
  if (window.lucide) window.lucide.createIcons();
});

function uid() {
  return Math.random().toString(36).slice(2, 10);
}

function blankRow() {
  return { id: uid(), item: "", spec: "", width: "", height: "", sqft: "", rate: "", amount: "" };
}

function row(item, spec, width, height, rate) {
  const sqft = round(width * height);
  return { id: uid(), item, spec, width, height, sqft, rate, amount: round(sqft * rate) };
}

function fixedRow(item, spec, amount) {
  return { id: uid(), item, spec, width: "", height: "", sqft: "", rate: "", amount };
}

function section(name, rows) {
  return { id: uid(), name, rows };
}

function round(value) {
  return Math.round((Number(value) || 0) * 100) / 100;
}

function bindMeta() {
  Object.keys(data.meta).forEach((key) => {
    const el = document.getElementById(key);
    if (!el) return;
    el.addEventListener("input", () => {
      data.meta[key] = el.type === "number" ? Number(el.value) : el.value;
      markUnsavedChanges();
      updateSummary();
    });
  });
  document.getElementById("materials").addEventListener("input", (event) => {
    data.materials = event.target.value;
    markUnsavedChanges();
    updateSummary();
  });
}

function bindActions() {
  document.getElementById("addSectionBtn").addEventListener("click", () => {
    const sectionData = { id: uid(), name: "", rows: [blankRow()] };
    data.sections.push(sectionData);
    activeSectionId = sectionData.id;
    markUnsavedChanges();
    renderSections();
    updateSummary();
  });
  document.getElementById("addSlabBtn").addEventListener("click", () => {
    data.slabs.push({ id: uid(), title: "", description: "", percent: "" });
    markUnsavedChanges();
    renderSlabs();
    updateSummary();
  });
  document.getElementById("sampleBtn").addEventListener("click", () => {
    sampleLoaded = !sampleLoaded;
    data = sampleLoaded ? sampleData() : blankData();
    markUnsavedChanges();
    renderAll();
    updateSampleButton();
    setStatus(sampleLoaded ? "Sample quotation loaded" : "Fresh form ready");
  });
  document.getElementById("downloadBtn").addEventListener("click", async () => {
    await downloadPdf(false);
  });
  document.getElementById("reviewDownloadBtn").addEventListener("click", async () => {
    await downloadPdf(false);
  });
  document.getElementById("printBtn").addEventListener("click", async () => {
    await downloadPdf(true);
  });
  document.getElementById("pdfUpload").addEventListener("change", importPdf);
  document.querySelectorAll("[data-tab-jump]").forEach((button) => {
    button.addEventListener("click", () => activateTab(button.dataset.tabJump));
  });
}

function bindTabs() {
  document.querySelectorAll("[data-tab-target]").forEach((button) => {
    button.addEventListener("click", () => activateTab(button.dataset.tabTarget));
  });
}

function activateTab(targetId) {
  if (!tabIds.includes(targetId)) return;
  document.querySelectorAll("[data-tab-target]").forEach((button) => {
    button.classList.toggle("active", button.dataset.tabTarget === targetId);
  });
  document.querySelectorAll(".tab-panel").forEach((panel) => {
    panel.classList.toggle("active", panel.id === targetId);
  });
}

function renderAll() {
  Object.entries(data.meta).forEach(([key, value]) => {
    const el = document.getElementById(key);
    if (el) el.value = value ?? "";
  });
  document.getElementById("materials").value = data.materials || "";
  renderSections();
  renderSlabs();
  updateSummary();
  updateSampleButton();
}

function updateSampleButton() {
  const button = document.getElementById("sampleBtn");
  if (!button) return;
  button.classList.toggle("active", sampleLoaded);
  button.title = sampleLoaded ? "Clear the sample quotation" : "Load the sample from the reference quotation";
  const label = button.querySelector("span");
  if (label) label.textContent = sampleLoaded ? "Clear Sample" : "Sample";
}

function renderSections() {
  const root = document.getElementById("sections");
  root.innerHTML = "";
  ensureActiveSection();
  const datalist = document.createElement("datalist");
  datalist.id = "areaOptionsList";
  datalist.innerHTML = areaDatalistHtml();
  root.appendChild(datalist);
  const itemDatalist = document.createElement("datalist");
  itemDatalist.id = "itemOptionsList";
  itemDatalist.innerHTML = itemDatalistHtml();
  root.appendChild(itemDatalist);
  const tabs = document.createElement("div");
  tabs.className = "section-tabs";
  tabs.setAttribute("aria-label", "Item area sections");
  data.sections.forEach((sectionData, index) => {
    const sectionItemCount = sectionData.rows.filter((rowData) => rowData.item || rowData.spec || rowData.amount).length;
    const button = document.createElement("button");
    button.className = "section-tab";
    button.type = "button";
    button.dataset.sectionId = sectionData.id;
    button.classList.toggle("active", sectionData.id === activeSectionId);
    button.innerHTML = `
      <span>${escapeHtml(areaDisplayName(sectionData, index))}</span>
      <small>${sectionItemCount} ${sectionItemCount === 1 ? "item" : "items"}</small>
    `;
    button.addEventListener("click", () => {
      activeSectionId = sectionData.id;
      renderSections();
    });
    tabs.appendChild(button);
  });
  root.appendChild(tabs);
  data.sections.forEach((sectionData) => {
    const card = document.createElement("article");
    card.className = "area-card";
    card.classList.toggle("active", sectionData.id === activeSectionId);
    card.innerHTML = `
      <div class="area-top">
        <label>Area name<input data-field="section-name" list="areaOptionsList" value="${escapeHtml(sectionData.name)}" placeholder="Search or select area"></label>
        <button class="btn small" data-action="add-row" type="button"><i data-lucide="plus"></i><span>Add Item</span></button>
        <button class="btn icon ghost" data-action="delete-section" type="button" title="Delete area"><i data-lucide="trash-2"></i></button>
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>Specifications</th>
              <th>Width (in ft.)</th>
              <th>Height (in ft.)</th>
              <th>Total sq. ft.</th>
              <th>Rate per sq. ft.</th>
              <th>Amount</th>
              <th></th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>
      <div class="area-total"></div>
    `;
    const tbody = card.querySelector("tbody");
    sectionData.rows.forEach((rowData) => tbody.appendChild(renderRow(sectionData, rowData)));
    wireSection(card, sectionData);
    root.appendChild(card);
    updateAreaTotal(card, sectionData);
  });
  if (window.lucide) window.lucide.createIcons();
}

function ensureActiveSection() {
  if (!data.sections.length) {
    data.sections.push({ id: uid(), name: "", rows: [blankRow()] });
  }
  if (!activeSectionId || !data.sections.some((sectionData) => sectionData.id === activeSectionId)) {
    activeSectionId = data.sections[0].id;
  }
}

function areaDisplayName(sectionData, index) {
  return sectionData.name || `Area ${index + 1}`;
}

function areaDatalistHtml() {
  const customOptions = data.sections
    .map((sectionData) => String(sectionData.name || "").trim())
    .filter((name) => name && !areaOptions.includes(name));
  return [...new Set([...areaOptions, ...customOptions])]
    .map((option) => `<option value="${escapeHtml(option)}"></option>`)
    .join("");
}

function itemDatalistHtml() {
  const customOptions = data.sections
    .flatMap((sectionData) => sectionData.rows.map((rowData) => String(rowData.item || "").trim()))
    .filter((name) => name && !itemOptions.includes(name));
  return [...new Set([...itemOptions, ...customOptions])]
    .map((option) => `<option value="${escapeHtml(option)}"></option>`)
    .join("");
}

function renderRow(sectionData, rowData) {
  const tr = document.createElement("tr");
  tr.innerHTML = `
    <td><input data-field="item" list="itemOptionsList" value="${escapeHtml(rowData.item)}" placeholder="Search or type item"></td>
    <td><textarea rows="2" data-field="spec" placeholder="18 MM ply with laminate finish">${escapeHtml(rowData.spec)}</textarea></td>
    <td><input class="num" type="number" step="0.01" data-field="width" value="${rowData.width}"></td>
    <td><input class="num" type="number" step="0.01" data-field="height" value="${rowData.height}"></td>
    <td><input class="num" type="number" step="0.01" data-field="sqft" value="${rowData.sqft}"></td>
    <td><input class="num" type="number" step="0.01" data-field="rate" value="${rowData.rate}"></td>
    <td class="amount-cell"><input type="number" step="0.01" data-field="amount" value="${rowData.amount}"></td>
    <td><div class="row-actions"><button class="btn icon ghost" data-action="delete-row" type="button" title="Delete item"><i data-lucide="trash-2"></i></button></div></td>
  `;
  tr.querySelectorAll("[data-field]").forEach((input) => {
    input.addEventListener("input", () => {
      const field = input.dataset.field;
      rowData[field] = ["width", "height", "sqft", "rate", "amount"].includes(field) ? cleanNumber(input.value) : input.value;
      if (["width", "height"].includes(field) && rowData.width !== "" && rowData.height !== "") {
        rowData.sqft = round(Number(rowData.width) * Number(rowData.height));
        tr.querySelector('[data-field="sqft"]').value = rowData.sqft;
      }
      if (["width", "height", "sqft", "rate"].includes(field) && rowData.sqft !== "" && rowData.rate !== "") {
        rowData.amount = round(Number(rowData.sqft) * Number(rowData.rate));
        tr.querySelector('[data-field="amount"]').value = rowData.amount;
      }
      markUnsavedChanges();
      updateSummary();
      updateAreaTotal(tr.closest(".area-card"), sectionData);
    });
  });
  tr.querySelector('[data-action="delete-row"]').addEventListener("click", () => {
    sectionData.rows = sectionData.rows.filter((item) => item.id !== rowData.id);
    if (sectionData.rows.length === 0) sectionData.rows.push(blankRow());
    markUnsavedChanges();
    renderSections();
    updateSummary();
  });
  return tr;
}

function wireSection(card, sectionData) {
  card.querySelector('[data-field="section-name"]').addEventListener("input", (event) => {
    sectionData.name = event.target.value;
    markUnsavedChanges();
    const tabLabel = document.querySelector(`[data-section-id="${sectionData.id}"] span`);
    const sectionIndex = data.sections.findIndex((item) => item.id === sectionData.id);
    if (tabLabel) tabLabel.textContent = areaDisplayName(sectionData, sectionIndex);
    updateSummary();
  });
  card.querySelector('[data-action="add-row"]').addEventListener("click", () => {
    sectionData.rows.push(blankRow());
    markUnsavedChanges();
    renderSections();
    updateSummary();
  });
  card.querySelector('[data-action="delete-section"]').addEventListener("click", () => {
    data.sections = data.sections.filter((item) => item.id !== sectionData.id);
    markUnsavedChanges();
    if (activeSectionId === sectionData.id) activeSectionId = "";
    if (data.sections.length === 0) {
      const nextSection = { id: uid(), name: "", rows: [blankRow()] };
      data.sections.push(nextSection);
      activeSectionId = nextSection.id;
    }
    renderSections();
    updateSummary();
  });
}

function renderSlabs() {
  const root = document.getElementById("slabs");
  root.innerHTML = "";
  data.slabs.forEach((slab) => {
    const rowEl = document.createElement("div");
    rowEl.className = "slab-row";
    rowEl.innerHTML = `
      <label>Slab<input data-field="title" value="${escapeHtml(slab.title)}"></label>
      <label>Description<input data-field="description" value="${escapeHtml(slab.description)}" placeholder="Work stage or payment condition"></label>
      <label>Value<input data-field="percent" value="${slab.percent}"></label>
      <button class="btn icon ghost" type="button" title="Delete slab"><i data-lucide="trash-2"></i></button>
    `;
    rowEl.querySelectorAll("[data-field]").forEach((input) => {
      input.addEventListener("input", () => {
        slab[input.dataset.field] = input.value;
        markUnsavedChanges();
        updateSummary();
      });
    });
    rowEl.querySelector("button").addEventListener("click", () => {
      data.slabs = data.slabs.filter((item) => item.id !== slab.id);
      markUnsavedChanges();
      renderSlabs();
      updateSummary();
    });
    root.appendChild(rowEl);
  });
  if (window.lucide) window.lucide.createIcons();
}

function cleanNumber(value) {
  return value === "" ? "" : Number(value);
}

function totals() {
  const itemCount = data.sections.reduce((sum, sectionData) => sum + sectionData.rows.filter((r) => r.item || r.spec || r.amount).length, 0);
  const workTotal = data.sections.reduce((sum, sectionData) => sum + sectionData.rows.reduce((rowSum, rowData) => rowSum + (Number(rowData.amount) || 0), 0), 0);
  const feeTotal = Math.round(workTotal * ((Number(data.meta.designerFeePercent) || 0) / 100));
  return { itemCount, workTotal, feeTotal, grandTotal: workTotal + feeTotal };
}

function updateSummary() {
  const total = totals();
  document.getElementById("itemCount").textContent = total.itemCount;
  document.getElementById("workTotal").textContent = formatMoney(total.workTotal);
  document.getElementById("feeTotal").textContent = formatMoney(total.feeTotal);
  document.getElementById("grandTotal").textContent = formatMoney(total.grandTotal);
  updateProgress(total);
  updateReview(total);
}

function completion() {
  const detailFields = ["clientName", "projectAddress"];
  const detailDone = detailFields.filter((key) => String(data.meta[key] || "").trim()).length;
  const itemDone = data.sections.some((sectionData) =>
    String(sectionData.name || "").trim() &&
    sectionData.rows.some((rowData) => String(rowData.item || "").trim() && Number(rowData.amount) > 0)
  ) ? 1 : 0;
  const termFields = [
    String(data.materials || "").trim(),
    data.slabs.some((slab) => String(slab.title || "").trim() && String(slab.description || "").trim()) ? "slabs" : ""
  ];
  const termDone = termFields.filter(Boolean).length;
  const done = detailDone + itemDone + termDone;
  const total = detailFields.length + 1 + termFields.length;
  return { detailDone, itemDone, termDone, done, total, percent: Math.round((done / total) * 100) };
}

function updateProgress(total) {
  const state = completion();
  document.getElementById("progressText").textContent = `${state.percent}%`;
  document.getElementById("progressFill").style.width = `${state.percent}%`;
  document.getElementById("detailsProgress").textContent = `${state.detailDone}/2`;
  document.getElementById("itemsProgress").textContent = `${total.itemCount} ${total.itemCount === 1 ? "item" : "items"}`;
  document.getElementById("termsProgress").textContent = `${state.termDone}/2`;
  document.getElementById("reviewProgress").textContent = `${state.percent}%`;
  document.getElementById("summaryProgress").textContent = formatMoney(total.grandTotal);
  document.querySelector('[data-tab-target="detailsPanel"]').classList.toggle("complete", state.detailDone === 2);
  document.querySelector('[data-tab-target="itemsPanel"]').classList.toggle("complete", state.itemDone === 1);
  document.querySelector('[data-tab-target="termsPanel"]').classList.toggle("complete", state.termDone === 2);
  document.querySelector('[data-tab-target="reviewPanel"]').classList.toggle("complete", state.percent === 100 && total.grandTotal > 0);
  document.querySelector('[data-tab-target="summaryPanel"]').classList.toggle("complete", total.grandTotal > 0);
}

function updateReview(total) {
  document.getElementById("reviewClient").textContent = data.meta.clientName || "Not added";
  document.getElementById("reviewProject").textContent = data.meta.projectAddress || "Not added";
  document.getElementById("reviewAreas").textContent = data.sections.filter((sectionData) => sectionData.name || sectionData.rows.some((rowData) => rowData.item || rowData.amount)).length;
  document.getElementById("reviewGrand").textContent = formatMoney(total.grandTotal);
}

function updateAreaTotal(card, sectionData) {
  const sum = sectionData.rows.reduce((total, rowData) => total + (Number(rowData.amount) || 0), 0);
  card.querySelector(".area-total").textContent = `Area total: ${formatMoney(sum)}`;
}

function formatMoney(value) {
  return `Rs. ${money.format(Math.round(Number(value) || 0))}`;
}

async function downloadPdf(printOnly) {
  try {
    setDownloadBusy(true, printOnly);
    setStatus("Preparing PDF...");
    await ensureLibraries();
    const bytes = await buildPdf();
    const blob = new Blob([bytes], { type: "application/pdf" });
    const fileName = quoteFileName();
    const url = URL.createObjectURL(blob);
    if (printOnly) {
      const win = window.open(url, "_blank");
      if (win) win.addEventListener("load", () => win.print(), { once: true });
      setStatus("PDF opened for printing");
      return;
    }
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 30000);
    setStatus("PDF downloaded");
  } catch (error) {
    console.error(error);
    setStatus(error.message || "Could not create PDF", true);
  } finally {
    setDownloadBusy(false, printOnly);
  }
}

function setDownloadBusy(isBusy, printOnly) {
  const buttonIds = printOnly ? ["printBtn"] : ["downloadBtn", "reviewDownloadBtn"];
  buttonIds.forEach((id) => {
    const button = document.getElementById(id);
    if (!button) return;
    button.disabled = isBusy;
    const label = button.querySelector("span");
    if (!label) return;
    if (!button.dataset.readyLabel) button.dataset.readyLabel = label.textContent;
    label.textContent = isBusy ? "Preparing..." : button.dataset.readyLabel;
  });
}

async function buildPdf() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ unit: "pt", format: "a4", compress: false });
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 38;
  const logo = await logoDataUrl();
  const total = totals();

  doc.setFillColor(255, 250, 244);
  doc.rect(0, 0, pageWidth, 108, "F");
  if (logo) doc.addImage(logo, "PNG", margin, 20, 74, 47);
  doc.setTextColor(47, 37, 31);
  doc.setFont("times", "bold");
  doc.setFontSize(25);
  doc.text("Interiors by Pooja", margin + 92, 42);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.setFont("helvetica", "italic");
  doc.setTextColor(138, 95, 68);
  doc.text("Turning spaces into stories you'll love", margin + 92, 62);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(85, 76, 70);
  doc.text(`Date: ${data.meta.quoteDate || ""}`, pageWidth - margin, 36, { align: "right" });
  doc.text(`Grand Total: ${formatMoney(total.grandTotal)}`, pageWidth - margin, 54, { align: "right" });

  doc.setDrawColor(226, 216, 206);
  doc.line(margin, 116, pageWidth - margin, 116);
  doc.autoTable({
    startY: 128,
    head: [[
      { content: "Client's Details", colSpan: 2 },
      { content: "Company Details", colSpan: 2 }
    ]],
    body: [
      ["Name:", data.meta.clientName || "", "Contact:", data.meta.companyPhone || ""],
      ["Project Address:", data.meta.projectAddress || "", "Office Address:", data.meta.officeAddress || ""]
    ],
    theme: "grid",
    margin: { left: margin, right: margin },
    styles: { fontSize: 8, cellPadding: 5, lineColor: [216, 204, 194], lineWidth: 0.45, valign: "middle" },
    headStyles: { fillColor: [242, 238, 233], textColor: [76, 70, 63], fontStyle: "bold", halign: "center" },
    bodyStyles: { fillColor: [255, 250, 244], textColor: [47, 41, 37] },
    columnStyles: {
      0: { cellWidth: 86, halign: "right", fontStyle: "bold", textColor: [95, 85, 79] },
      1: { cellWidth: 150 },
      2: { cellWidth: 86, halign: "right", fontStyle: "bold", textColor: [95, 85, 79] },
      3: { cellWidth: 151 }
    }
  });

  let startY = doc.lastAutoTable.finalY + 14;
  data.sections.forEach((sectionData) => {
    const rows = sectionData.rows
      .filter((item) => item.item || item.spec || item.amount)
      .map((item) => [
        item.item || "",
        item.spec || "",
        item.width || "",
        item.height || "",
        item.sqft || "",
        item.rate || "",
        item.amount ? formatMoney(Number(item.amount)) : ""
      ]);
    if (!rows.length) return;
    doc.autoTable({
      startY,
      head: [[sectionData.name || "Area", "Specifications", "W", "H", "Sq.Ft.", "Rate", "Amount"]],
      body: rows,
      theme: "grid",
      margin: { left: margin, right: margin },
      styles: { fontSize: 8, cellPadding: 4, overflow: "linebreak", lineColor: [226, 216, 206], lineWidth: 0.5 },
      headStyles: { fillColor: [185, 82, 47], textColor: [255, 255, 255], fontStyle: "bold" },
      columnStyles: {
        0: { cellWidth: 82 },
        1: { cellWidth: 205 },
        2: { cellWidth: 38, halign: "right" },
        3: { cellWidth: 38, halign: "right" },
        4: { cellWidth: 48, halign: "right" },
        5: { cellWidth: 48, halign: "right" },
        6: { cellWidth: 62, halign: "right" }
      }
    });
    startY = doc.lastAutoTable.finalY + 14;
  });

  doc.autoTable({
    startY,
    body: [
      ["Work Total", formatMoney(total.workTotal)],
      [`Designer Fees (${Number(data.meta.designerFeePercent) || 0}%)`, formatMoney(total.feeTotal)],
      ["Grand Total", formatMoney(total.grandTotal)]
    ],
    theme: "plain",
    margin: { left: 330, right: margin },
    styles: { fontSize: 10, cellPadding: 5 },
    columnStyles: { 0: { fontStyle: "bold" }, 1: { halign: "right", fontStyle: "bold" } },
    didParseCell: (hook) => {
      if (hook.row.index === 2) {
        hook.cell.styles.fillColor = [255, 250, 244];
        hook.cell.styles.textColor = [132, 59, 36];
      }
    }
  });
  startY = doc.lastAutoTable.finalY + 18;

  if (data.materials) {
    doc.addPage();
    startY = 42;
    doc.autoTable({
      startY,
      head: [["Material Specifications"]],
      body: [[data.materials]],
      theme: "grid",
      margin: { left: margin, right: margin },
      styles: { fontSize: 8, cellPadding: 5, lineColor: [226, 216, 206], lineWidth: 0.5 },
      headStyles: { fillColor: [104, 116, 99], textColor: [255, 255, 255] }
    });
    startY = doc.lastAutoTable.finalY + 14;
  }

  const slabRows = data.slabs.map((slab) => [slab.title, slab.description, slab.percent ? `${slab.percent}%` : ""]);
  if (slabRows.length) {
    doc.autoTable({
      startY,
      head: [["Payment Slab", "Description", "%"]],
      body: slabRows,
      theme: "grid",
      margin: { left: margin, right: margin },
      styles: { fontSize: 8, cellPadding: 5, lineColor: [226, 216, 206], lineWidth: 0.5 },
      headStyles: { fillColor: [185, 148, 92], textColor: [47, 37, 31] },
      columnStyles: { 0: { cellWidth: 100 }, 2: { cellWidth: 45, halign: "right" } }
    });
  }

  const pageCount = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i += 1) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(115, 102, 93);
    doc.text(`Pooja Interior Ledger | Page ${i} of ${pageCount}`, margin, 820);
  }

  const sourceBytes = doc.output("arraybuffer");
  const pdfDoc = await window.PDFLib.PDFDocument.load(sourceBytes);
  pdfDoc.setTitle(`${data.meta.clientName || "Interior"} Quotation`);
  pdfDoc.setSubject(MARKER + encodeData(data));
  pdfDoc.setCreator("Pooja Interior Ledger");
  pdfDoc.setProducer("Pooja Interior Ledger");
  return pdfDoc.save({ useObjectStreams: false });
}

async function importPdf(event) {
  const file = event.target.files[0];
  if (!file) return;
  try {
    await ensureLibraries();
    setStatus("Reading uploaded PDF...");
    const bytes = await file.arrayBuffer();
    const pdfDoc = await window.PDFLib.PDFDocument.load(bytes);
    const subject = pdfDoc.getSubject() || "";
    if (!subject.startsWith(MARKER)) {
      throw new Error("This PDF does not contain editable data from Pooja Interior Ledger.");
    }
    data = normalizeImported(decodeData(subject.slice(MARKER.length)));
    sampleLoaded = false;
    markUnsavedChanges();
    renderAll();
    setStatus("PDF loaded and ready to edit");
  } catch (error) {
    console.error(error);
    setStatus(error.message || "Could not read this PDF", true);
  } finally {
    event.target.value = "";
  }
}

function normalizeImported(imported) {
  const next = blankData();
  next.meta = { ...next.meta, ...(imported.meta || {}) };
  next.sections = (imported.sections || []).map((sectionData) => ({
    id: uid(),
    name: sectionData.name || "Area",
    rows: (sectionData.rows || [blankRow()]).map((rowData) => ({ ...blankRow(), ...rowData, id: uid() }))
  }));
  if (!next.sections.length) next.sections = blankData().sections;
  next.materials = imported.materials || "";
  next.slabs = (imported.slabs || []).map((slab) => ({ id: uid(), title: slab.title || "", description: slab.description || "", percent: Number(slab.percent) || 0 }));
  return next;
}

async function ensureLibraries() {
  for (const script of pdfScripts) {
    if (!script.ready()) await loadScript(script);
  }
  if (!window.jspdf?.jsPDF || !window.PDFLib?.PDFDocument || !window.jspdf.jsPDF.API.autoTable) {
    throw new Error("PDF tools could not load. Please check your internet connection and try again.");
  }
}

function loadScript(script) {
  return new Promise((resolve, reject) => {
    if (script.ready()) {
      resolve();
      return;
    }
    const existing = document.querySelector(`script[data-pdf-tool="${script.key}"]`) || [...document.scripts].find((item) => item.src === script.src);
    if (existing) {
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener("error", () => reject(new Error(`Could not load ${script.key}`)), { once: true });
      setTimeout(() => script.ready() ? resolve() : reject(new Error(`Could not load ${script.key}`)), 12000);
      return;
    }
    const tag = document.createElement("script");
    tag.src = script.src;
    tag.defer = true;
    tag.dataset.pdfTool = script.key;
    tag.onload = () => resolve();
    tag.onerror = () => reject(new Error(`Could not load ${script.key}`));
    document.head.appendChild(tag);
  });
}

function encodeData(value) {
  return btoa(unescape(encodeURIComponent(JSON.stringify(value))));
}

function decodeData(value) {
  return JSON.parse(decodeURIComponent(escape(atob(value))));
}

function quoteFileName() {
  const base = (data.meta.clientName || "interior-quotation")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return `${base || "interior-quotation"}-pooja-ledger.pdf`;
}

async function logoDataUrl() {
  return new Promise((resolve) => {
    const image = new Image();
    image.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = image.naturalWidth;
      canvas.height = image.naturalHeight;
      const context = canvas.getContext("2d");
      context.drawImage(image, 0, 0);
      resolve(canvas.toDataURL("image/png"));
    };
    image.onerror = () => resolve("");
    image.src = "assets/pooja-logo.png";
  });
}

function setStatus(message, isError = false) {
  const el = document.getElementById("uploadStatus");
  el.textContent = message;
  el.style.color = isError ? "#843b24" : "#687463";
  el.style.background = isError ? "rgba(185, 82, 47, 0.12)" : "rgba(104, 116, 99, 0.12)";
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}
