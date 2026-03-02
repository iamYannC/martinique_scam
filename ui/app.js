/* ═══════════════════════════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════════════════════════ */
const SUSPECTS = [
  {
    name: "Etienne Moulinat",
    role: "Main Scammer", roleCls: "scammer", stars: 5,
    photos: ["../Pictures/Etienne Whatsapp.jpg","../Pictures/Etienne gmail.jpg"],
    docs: ["../ID Etienne.jpg"],
    snippet: "Orchestrated the entire scam over email.",
    money: "Received \u20ac800 total",
    desc: "Primary orchestrator. Posed as a landlord renting a Sainte-Anne studio. Gradually escalated demands from \u20ac20 to \u20ac800 across 5 days via 4 wire transfers to two beneficiaries. Never completed a meaningful phone call. Provided a non-existent contract address. Never showed up to the appointment.",
    sections: [
      { label: "Contact", rows: [
        { k:"Phone", v:"+33 7 57 83 91 83" },
        { k:"Email", v:"etiennemoulinat4@gmail.com" },
      ]},
      { label: "Identity Card", rows: [
        { k:"Full Name",  v:"MOULINAT Etienne Edouard Jean-Marie" },
        { k:"Birth Date", v:"19/10/1948" },
        { k:"ID Number",  v:"150106102409" },
        { k:"Document",   v:"ID Etienne.pdf" },
      ], mrz: ["IDFRAMOULINAT<<<<<<<<<<<<<<<<<061014","1501061024091ETIENNE<<EDOUA4810195M6"] },
    ]
  },
  {
    name: "Reine Sabrina",
    role: "Facebook", roleCls: "facebook", stars: 2,
    photos: ["../Pictures/Reine Sabrina.jpg"],
    snippet: "Posted the rental ad. Entry point of the scam.",
    desc: "Posted the apartment rental ad on a Martinique Facebook group. Privately shared Sylvain\u2019s phone number and Etienne\u2019s email address to the victim. Claims Etienne is her cousin.",
    sections: [
      { label: "Contact", rows: [
        { k:"Platform", v:"Facebook Messenger" },
        { k:"Phone",    v:"Unknown" },
        { k:"Email",    v:"Unknown" },
      ]}
    ]
  },
  {
    name: "Sylvain",
    role: "Realtor", roleCls: "realtor", stars: 3,
    photos: ["../Pictures/Sylvain.jpg"],
    snippet: "WhatsApp intermediary. Never answered calls.",
    desc: "Second contact, reached via WhatsApp (+33 7 73 97 29 07, number given by Reine). Redirected all communication to Etienne\u2019s email. Never answered any calls. After Monday\u2019s transfers, messages showed single checkmarks only \u2014 likely blocked the victim.",
    sections: [
      { label: "Contact", rows: [
        { k:"Phone", v:"+33 7 73 97 29 07" },
        { k:"Platform", v:"WhatsApp" },
      ]}
    ]
  },
  {
    name: "Sondayeni Sanou",
    role: "Beneficiary", roleCls: "beneficiary", stars: 4,
    photos: [],
    snippet: "Money mule #1. Received \u20ac600.",
    money: "\u20ac600 received (Transfers #1, #2 & #3)",
    desc: "First money mule. Received \u20ac200 on Monday (via Wise), \u20ac200 on Tuesday (via Nickel), and another \u20ac200 on Wednesday (via Nickel) after Etienne falsely claimed the previous transfer had been rejected. Presented as Etienne\u2019s \u2018collaboratrice\u2019. Account at Deblock, a French fintech.",
    sections: [
      { label: "Banking Details", rows: [
        { k:"IBAN",      v:"FR76 1774 8019 8470 0732 7966 495" },
        { k:"BIC",       v:"DBLKFR22XXX" },
        { k:"Bank",      v:"Deblock" },
        { k:"Bank URL",  v:"deblock.com/fr-FR", link:"https://deblock.com/fr-FR" },
      ]}
    ]
  },
  {
    name: "Junior Yohan",
    role: "Beneficiary", roleCls: "beneficiary", stars: 4,
    photos: [],
    snippet: "Money mule #2. \"Etienne's brother.\"",
    money: "\u20ac200 received (Transfer #4)",
    desc: "Second money mule. Introduced on Wednesday as an alternative beneficiary \u2014 claimed to be Etienne\u2019s brother and employee. Received \u20ac200 from the victim\u2019s uncle via instant transfer (Wise \u2192 BoursoBank).",
    extra: "Etienne's brother",
    sections: [
      { label: "Banking Details", rows: [
        { k:"IBAN",      v:"FR76 4061 8805 0500 0406 8586 984" },
        { k:"BIC",       v:"BOUSFRPPXXX" },
        { k:"Bank",      v:"BoursoBank" },
        { k:"Bank URL",  v:"boursobank.com", link:"https://www.boursobank.com/" },
      ]}
    ]
  }
];

const DAYS = [
  { key:"sat", name:"SAT", date:"21 Feb" },
  { key:"sun", name:"SUN", date:"22 Feb" },
  { key:"mon", name:"MON", date:"23 Feb" },
  { key:"tue", name:"TUE", date:"24 Feb" },
  { key:"wed", name:"WED", date:"25 Feb" },
];

const EVENTS = [
  // SAT
  { day:"sat", time:"08:36", type:"contact", title:"Facebook Ad Seen",
    actor:"Reine Sabrina",
    desc:"Yann sees a rental ad on a Martinique Facebook group and messages the author, Reine Sabrina." },
  { day:"sat", time:"13:10", type:"contact", title:"Referral Received",
    actor:"Reine Sabrina",
    desc:"Reine says her cousin handles rentals. Shares a phone number (+33 773 97 29 07) and an email (etiennemoulinat4@gmail.com). They belong to different people. Reine asks to communicate by email." },
  // SUN
  { day:"sun", time:"14:23", type:"contact", title:"WhatsApp: Sylvain",
    actor:"Sylvain",
    desc:"Yann contacts the phone number on WhatsApp. Sylvain asks him to write to the email \u2014 phrasing it as if it were her own address." },
  { day:"sun", time:"14:29", type:"contact", title:"Email Thread Begins",
    actor:"Etienne",
    desc:"Etienne presents himself as the landlord. Offers a furnished studio at \u20ac450/mo and a 2-bed at \u20ac950/mo. The email thread will span 49 exchanges." },
  { day:"sun", time:"16:38", type:"info", title:"Studio Photos Shared",
    actor:"Etienne",
    desc:"Google Drive link sent with photos of the apartment." },
  { day:"sun", time:"18:28", type:"warning", title:"Documents Requested",
    actor:"Etienne",
    desc:"Etienne asks for ID and proof of income. Explicitly states deposit is paid at signing \u2014 no upfront payment needed." },
  { day:"sun", time:"21:17", type:"escalation", title:"Escalation #1 \u2014 \u20ac20",
    actor:"Etienne",
    img:{ en:"ui-screenshots/1-escalation-20.png" },
    desc:"After receiving Yann\u2019s personal documents, Etienne introduces a \u20ac20 \u2018seriousness\u2019 deposit to confirm the visit. Promised to be deducted from the security deposit." },
  // MON
  { day:"mon", time:"07:22", type:"escalation", title:"Escalation #2 \u2014 \u20ac220",
    actor:"Etienne",
    img:{ en:"ui-screenshots/2-escalation-220.png" },
    desc:"The amount jumps to \u20ac220. Etienne claims \u20ac200 covers his travel costs and is refundable if Yann doesn\u2019t like the apartment. \u20ac20 is kept regardless." },
  { day:"mon", time:"08:51", type:"banking", title:"Beneficiary: Sondayeni",
    actor:"Etienne",
    desc:"Bank details sent: Sondayeni Sanou, FR76 1774 8019 8470 0732 7966 495, Deblock. Chain is now: Facebook (Reine) \u2192 WhatsApp (Sylvain) \u2192 Email (Etienne) \u2192 Bank (Sondayeni)." },
  { day:"mon", time:"09:13", type:"warning", title:"Sylvain Unreachable",
    actor:"Sylvain",
    desc:"Yann tries calling Sylvain before transferring money. Two WhatsApp call attempts (09:16 and 10:00) \u2014 no answer." },
  { day:"mon", time:"10:37", type:"info", title:"Agreed on \u20ac200",
    actor:"Etienne",
    desc:"Yann\u2019s main bank (Nickel) blocks transfers to new beneficiaries for 24 hours. He uses Wise, which only has \u20ac200. Etienne accepts." },
  { day:"mon", time:"12:03", type:"transfer", title:"TRANSFER #1 \u2014 \u20ac200",
    actor:"Yann \u2192 Sondayeni",
    running: "-\u20ac200",
    receipt:["../Transfers/1st wise 200.jpg"],
    desc:"\u20ac200 sent from Wise to Sondayeni Sanou. First real money lost. Screenshot shared as proof. Running total: \u20ac200." },
  { day:"mon", time:"13:15", type:"appointment", title:"Meeting Confirmed",
    actor:"Etienne + Sylvain",
    desc:"Appointment agreed: Wednesday 25 Feb at 14:00 at the apartment. Address to follow." },
  // TUE
  { day:"tue", time:"13:36", type:"escalation", title:"Escalation #3 \u2014 +\u20ac200",
    actor:"Etienne",
    desc:"Etienne demands another \u20ac200 on top of the previous transfer. Only \u20ac50 remains for the meeting. Shares his WhatsApp for the first time: +33 757 839 183." },
  { day:"tue", time:"15:25", type:"warning", title:"Sylvain Blocked?",
    actor:"Sylvain",
    img:{ en:"ui-screenshots/sylvain-stops-answer-blocks EN.jpg",
          fr:"ui-screenshots/sylvain-stops-answer-blocks.jpg" },
    imgTall: true,
    desc:"Messages now show single checkmark. Landline goes to voicemail. Calls from a different number fail too. Yann suspects he was blocked." },
  { day:"tue", time:"15:38", type:"warning", title:"Failed Calls to Etienne",
    actor:"Etienne",
    desc:"Multiple WhatsApp calls between 15:39\u201315:42. Etienne answers but whispers, line drops repeatedly. Normal calls: busy immediately. No voice message ever sent." },
  { day:"tue", time:"15:59", type:"escalation", title:"Threatens Refund",
    actor:"Etienne",
    desc:"Etienne complains it\u2019s \u2018too complicated\u2019 and threatens to cancel and refund. Classic pressure tactic to force compliance." },
  { day:"tue", time:"16:24", type:"transfer", title:"TRANSFER #2 \u2014 \u20ac200",
    actor:"Yann \u2192 Sondayeni",
    running: "-\u20ac400",
    receipt:["../Transfers/2nd nickel 200.jpg"],
    desc:"\u20ac200 sent from Nickel to Sondayeni Sanou. Running total: \u20ac400." },
  { day:"tue", time:"16:41", type:"appointment", title:"Address Shared",
    actor:"Etienne",
    desc:"6 Rue Abb\u00e9 Hurard, Sainte-Anne 97227. Meeting confirmed for tomorrow at 14:00." },
  // WED
  { day:"wed", time:"05:38", type:"warning", title:"\"Transfer Rejected\"",
    actor:"Etienne",
    img:{ en:"ui-screenshots/4 false-claim-for-rejection EN.jpg",
          fr:"ui-screenshots/4 false-claim-for-rejection.jpg" },
    imgTall: true,
    desc:"Etienne falsely claims the bank returned the money to Yann\u2019s account. Sends fabricated screenshots as proof. Asks Yann to call his bank to \u2018fix it\u2019. The money was never returned \u2014 this lie prompted Transfer #3." },
  { day:"wed", time:"07:03", type:"transfer", title:"TRANSFER #3 \u2014 \u20ac200",
    actor:"Yann \u2192 Sondayeni",
    running: "-\u20ac600",
    receipt:["../Transfers/3rd nickel 200.jpg"],
    desc:"\u20ac200 re-sent from Nickel to Sondayeni Sanou after Etienne\u2019s false claim that the previous transfer was rejected. Running total: \u20ac600." },
  { day:"wed", time:"09:52", type:"banking", title:"New Beneficiary: Junior",
    actor:"Etienne",
    desc:"New IBAN given: Junior Yohan, FR76 4061 8805 0500 0406 8586 984 (BoursoBank). Claimed to be Etienne\u2019s brother and employee." },
  { day:"wed", time:"11:01", type:"transfer", title:"TRANSFER #4 \u2014 \u20ac200",
    actor:"Yann's uncle \u2192 Junior",
    running: "-\u20ac800",
    receipt:["../Transfers/4th wise ariel 200.jpg"],
    desc:"\u20ac200 sent by Yann\u2019s uncle to Junior Yohan (BoursoBank) via Wise instant transfer. Running total: \u20ac800." },
  { day:"wed", time:"12:27", type:"appointment", title:"Yann Arrives",
    actor:"Yann",
    desc:"Yann arrives at 6 Rue Abb\u00e9 Hurard, Sainte-Anne, with all his luggage. Waits outside in the heat." },
  { day:"wed", time:"14:00+", type:"ghosted", title:"NOBODY SHOWS UP",
    actor:"Etienne",
    img:{ en:"ui-screenshots/5 etienne-never-shows-up-blocks EN.jpg",
          fr:"ui-screenshots/5 etienne-never-shows-up-blocks.jpg" },
    imgTall: true,
    desc:"The appointment time comes and goes. Etienne claims to be \u2018on the way\u2019 but the address doesn\u2019t match any residence. He eventually goes completely silent." },
  { day:"wed", time:"16:46", type:"ghosted", title:"Complaint Filed",
    actor:"Yann",
    img:{ en:"ui-screenshots/last-police-st-anne.jpg" },
    desc:"Yann files a formal complaint. All communication channels go dark." },
];

const TYPE_META = {
  contact:     { color:"var(--blue)",   label:"CONTACT" },
  info:        { color:"var(--teal)",   label:"INFO" },
  warning:     { color:"var(--yellow)", label:"WARNING" },
  escalation:  { color:"var(--orange)", label:"ESCALATION" },
  banking:     { color:"var(--purple)", label:"BANKING" },
  transfer:    { color:"var(--red)",    label:"TRANSFER" },
  appointment: { color:"var(--green)",  label:"APPOINTMENT" },
  ghosted:     { color:"#555",          label:"GHOSTED" },
};

/* ═══════════════════════════════════════════════════════════════════════════
   NAVIGATION
   ═══════════════════════════════════════════════════════════════════════════ */
function go(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

/* ═══════════════════════════════════════════════════════════════════════════
   RENDER SUSPECTS
   ═══════════════════════════════════════════════════════════════════════════ */
function renderSuspects() {
  const grid = document.getElementById('suspects-grid');
  grid.innerHTML = SUSPECTS.map((s, i) => {
    const photo = s.photos.length
      ? `<img class="s-photo" src="${s.photos[0]}" alt="${s.name}">`
      : `<div class="s-placeholder">&#9764;</div>`;
    const money = s.money ? `<div class="s-money">${s.money}</div>` : '';
    return `
      <div class="s-card" onclick="openSus(${i})">
        ${photo}
        <div class="s-body">
          <div class="s-role role-${s.roleCls}">${s.role}</div>
          <div class="s-name">${s.name}</div>
          <div class="s-snippet">${s.snippet}</div>
          ${money}
          <div class="s-tap">CLICK TO VIEW</div>
        </div>
      </div>`;
  }).join('');
}

/* ═══════════════════════════════════════════════════════════════════════════
   SUSPECT MODAL
   ═══════════════════════════════════════════════════════════════════════════ */
function openSus(i) {
  const s = SUSPECTS[i];
  const photo = s.photos.length
    ? `<img class="m-photo" src="${s.photos[0]}" alt="${s.name}">`
    : `<div class="m-photo-none">&#9764;</div>`;
  const stars = '&#9733;'.repeat(s.stars) + '<span style="color:#222">' + '&#9733;'.repeat(5 - s.stars) + '</span>';

  let extra = s.extra
    ? `<div style="margin-top:8px;font-family:'Share Tech Mono',monospace;font-size:10px;letter-spacing:2px;color:var(--orange);">NOTE: ${s.extra.toUpperCase()}</div>`
    : '';

  let body = '';
  for (const sec of s.sections) {
    body += `<div class="m-section">${sec.label}</div>`;
    for (const r of sec.rows) {
      const val = r.link
        ? `<a href="${r.link}" target="_blank" style="color:var(--blue);text-decoration:none">${r.v}</a>`
        : r.v;
      body += `<div class="m-row"><div class="m-key">${r.k}</div><div class="m-val">${val}</div></div>`;
    }
    if (sec.mrz) {
      body += `<div class="m-row"><div class="m-key">MRZ</div></div>`;
      body += `<div class="m-mrz">${sec.mrz.join('<br>')}</div>`;
    }
  }

  if (s.photos.length > 1 || (s.docs && s.docs.length)) {
    body += `<div class="m-section">Photos &amp; Documents</div>`;
    body += `<div class="m-thumbs">`;
    for (const p of s.photos) {
      body += `<img class="m-thumb" src="${p}" alt="photo" onclick="window.open('${p}','_blank')">`;
    }
    body += `</div>`;
    if (s.docs && s.docs.length) {
      for (const d of s.docs) {
        const fname = d.split('/').pop();
        body += `<a class="m-doc-link" href="${d}" target="_blank">&#x1F4C4; ${fname}</a>`;
      }
    }
  }

  document.getElementById('sus-content').innerHTML = `
    <div class="m-head">
      ${photo}
      <div class="m-meta">
        <div class="m-role-line">SUSPECT FILE</div>
        <div class="m-name">${s.name}</div>
        <div class="m-stars">${stars}</div>
        <div class="s-role role-${s.roleCls}" style="margin-bottom:8px">${s.role}</div>
        ${s.money ? `<div style="font-family:'Share Tech Mono',monospace;font-size:11px;color:var(--red)">${s.money}</div>` : ''}
        ${extra}
      </div>
    </div>
    <div class="m-body">
      <div class="m-section">Profile</div>
      <div class="m-desc" style="margin-bottom:8px;color:#777;font-size:12.5px;line-height:1.65">${s.desc}</div>
      ${body}
    </div>`;
  document.getElementById('sus-overlay').classList.add('open');
}

function closeSus(e) { if (e.target === e.currentTarget) closeSusDirect(); }
function closeSusDirect() { document.getElementById('sus-overlay').classList.remove('open'); }

/* ═══════════════════════════════════════════════════════════════════════════
   RENDER TIMELINE — vertical narrative
   ═══════════════════════════════════════════════════════════════════════════ */
function renderTimeline() {
  // legend
  document.getElementById('tl-legend').innerHTML =
    Object.entries(TYPE_META).map(([k,v]) =>
      `<div class="leg"><div class="leg-dot" style="background:${v.color}"></div>${v.label}</div>`
    ).join('');

  // build narrative
  const track = document.getElementById('tl-track');
  let html = '';
  let currentDay = null;

  EVENTS.forEach((e, idx) => {
    // day divider
    if (e.day !== currentDay) {
      currentDay = e.day;
      const d = DAYS.find(d => d.key === currentDay);
      html += `<div class="tl-day-div">
        <span class="tl-day-name">${d.name}</span>
        <span class="tl-day-date">${d.date}</span>
      </div>`;
    }

    // screenshot block
    let imgHtml = '';
    if (e.img) {
      const hasFr = !!e.img.fr;
      const tallCls = e.imgTall ? ' tall' : '';
      if (hasFr) {
        imgHtml = `
          <div class="tl-screenshot" id="ss-${idx}">
            <div class="tl-lang">
              <button class="active" onclick="swapLang(${idx},'en',event)">EN</button>
              <button onclick="swapLang(${idx},'fr',event)">FR</button>
            </div>
            <img src="${e.img.en}" data-en="${e.img.en}" data-fr="${e.img.fr}" class="${tallCls}" alt="screenshot">
          </div>`;
      } else {
        imgHtml = `
          <div class="tl-screenshot">
            <img src="${e.img.en}" class="${tallCls}" alt="screenshot">
          </div>`;
      }
    }

    // receipt images (inline photos of transfer confirmations)
    let receiptHtml = '';
    if (e.receipt) {
      receiptHtml = `<div class="tl-receipt-imgs">` +
        e.receipt.map(src => `<img src="${src}" alt="transfer receipt">`).join('') +
        `</div>`;
    }

    html += `
      <div class="tl-ev t-${e.type}">
        <div class="tl-head">
          <span class="tl-time">${e.time}</span>
          <span class="tl-title">${e.title}</span>
        </div>
        <div class="tl-actor">${e.actor.toUpperCase()}</div>
        <div class="tl-desc">${e.desc}</div>
        ${receiptHtml}
        ${imgHtml}
      </div>`;

    if (e.running) {
      html += `
      <div class="tl-running">
        <div class="tl-running-amount">${e.running}</div>
        <div class="tl-running-label">RUNNING TOTAL</div>
      </div>`;
    }
  });

  // end marker
  html += `
    <div class="tl-end">
      <div class="tl-end-amount">-\u20ac800</div>
      <div class="tl-end-label">TOTAL LOST</div>
    </div>`;

 
/* screenshot language toggle */
function swapLang(idx, lang, evt) {
  evt.stopPropagation();
  const container = document.getElementById('ss-' + idx);
  const img = container.querySelector('img');
  img.src = img.dataset[lang];
  container.querySelectorAll('.tl-lang button').forEach(b => b.classList.remove('active'));
  evt.currentTarget.classList.add('active');
}

/* ═══════════════════════════════════════════════════════════════════════════
   KEYBOARD
   ═══════════════════════════════════════════════════════════════════════════ */
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    if (document.getElementById('sus-overlay').classList.contains('open'))
      return closeSusDirect();
    go('home');
  }
});

/* ═══════════════════════════════════════════════════════════════════════════
   INIT
   ═══════════════════════════════════════════════════════════════════════════ */
renderSuspects();
renderTimeline();
