
(function () {
  'use strict';

  let collegeData = null;
  const AVAILABLE_COLLEGES = [
    { id: 'rec-gonda', file: 'data/rec-gonda.json', name: 'Rajkiya Engineering College, Gonda' }

  ];

  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => document.querySelectorAll(sel);

  document.addEventListener('DOMContentLoaded', async () => {
    initNavigation();
    initThemeToggle();
    initScrollAnimations();

    const college = AVAILABLE_COLLEGES[0];
    try {
      const res = await fetch(college.file);
      if (!res.ok) throw new Error('Failed to load');
      collegeData = await res.json();
      launchGuide();
    } catch (err) {
      console.error('Failed to auto-load college data:', err);
    }
  });

  function populateCollegeSelector() {
    const select = $('#college-select');
    const btn = $('#btn-explore');

    AVAILABLE_COLLEGES.forEach(c => {
      const opt = document.createElement('option');
      opt.value = c.id;
      opt.textContent = c.name;
      select.appendChild(opt);
    });

    select.addEventListener('change', () => {
      btn.disabled = !select.value;
    });

    btn.addEventListener('click', async () => {
      const selectedId = select.value;
      if (!selectedId) return;

      btn.textContent = 'Loading...';
      btn.disabled = true;

      const college = AVAILABLE_COLLEGES.find(c => c.id === selectedId);
      if (!college) return;

      try {
        const res = await fetch(college.file);
        if (!res.ok) throw new Error('Failed to load data');
        collegeData = await res.json();
        launchGuide();
      } catch (err) {
        console.error(err);
        btn.textContent = 'Error loading data. Try again.';
        btn.disabled = false;
      }
    });
  }

  function launchGuide() {

    $('#landing').style.display = 'none';
    $('#main-nav').classList.add('visible');
    $('#credit-bar').classList.add('visible');
    $('#main-content').classList.add('visible');

    renderCollegeHeader();
    initRankPredictor();
    renderHowCollegeWorks();
    initFeeCalculator();
    initBudgetPlanner();
    renderFitGuide();
    renderCampusLifeGuide();
    renderBranchReviews();
    renderGalleryVideos();
    renderPlacementReality();
    renderFirstWeekKit();
    renderDocChecklist();
    renderHowToReach();
    renderAKTUDecoded();
    renderComparison();
    renderTimeline();
    renderLinksHub();
    renderROI();

    setTimeout(() => initScrollAnimations(), 100);
  }

  function renderCollegeHeader() {
    $('#college-name-display').textContent = collegeData.collegeFullName || collegeData.collegeName;
    const bar = $('#college-info-bar');
    const meta = collegeData.meta;
    const mapsLink = collegeData.howToReach?.googleMapsLink || `https://maps.google.com/?q=${encodeURIComponent(meta.location)}`;

    bar.innerHTML = `
      <span class="info-chip"> <strong>${meta.type}</strong></span>
      <span class="info-chip"> Est. <strong>${meta.established}</strong></span>
      <span class="info-chip"> <strong>${meta.affiliation}</strong></span>
      <span class="info-chip"> <strong>${meta.location}</strong></span>
      <a href="${mapsLink}" target="_blank" class="btn-map">
        <svg viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
        View on Map
      </a>
    `;
  }

  function renderHowCollegeWorks() {
    const container = $('#how-college-works-content');
    if (!container) return;
    const aktu = collegeData.aktuExamSystem;

    container.innerHTML = `
      <div class="grid-3" style="margin-bottom: var(--space-8);">
        <div class="card">
          <div class="section-tag" style="margin-bottom: var(--space-2);">Semesters</div>
          <div style="font-size: var(--text-2xl); font-weight: 700; color: var(--text-heading); margin-bottom: var(--space-2);">8</div>
          <div style="font-size: var(--text-sm); color: var(--text-secondary);">4 years &times; 2 semesters each</div>
        </div>
        <div class="card">
          <div class="section-tag" style="margin-bottom: var(--space-2);">Attendance</div>
          <div style="font-size: var(--text-2xl); font-weight: 700; color: var(--accent-warn); margin-bottom: var(--space-2);">${aktu?.attendance?.minimum || '75%'}</div>
          <div style="font-size: var(--text-sm); color: var(--text-secondary);">Minimum required per subject</div>
        </div>
        <div class="card">
          <div class="section-tag" style="margin-bottom: var(--space-2);">Exam Split</div>
          <div style="font-size: var(--text-2xl); font-weight: 700; color: var(--accent-2); margin-bottom: var(--space-2);">30 + 70</div>
          <div style="font-size: var(--text-sm); color: var(--text-secondary);">Internal + External marks</div>
        </div>
      </div>

      <div class="grid-2" style="margin-bottom: var(--space-8);">
        <div class="card">
          <h3 style="font-size: var(--text-base); margin-bottom: var(--space-4); color: var(--accent-2);">Odd Semester</h3>
          <div style="font-size: var(--text-sm); color: var(--text-secondary); line-height: 1.8;">Aug &rarr; Dec &bull; Exams: Dec &ndash; Jan</div>
        </div>
        <div class="card">
          <h3 style="font-size: var(--text-base); margin-bottom: var(--space-4); color: var(--accent-warn);">Even Semester</h3>
          <div style="font-size: var(--text-sm); color: var(--text-secondary); line-height: 1.8;">Feb &rarr; May &bull; Exams: May &ndash; Jun</div>
        </div>
      </div>

      <div class="card" style="border-left: 3px solid var(--accent-danger); margin-bottom: var(--space-5);">
        <h3 style="font-size: var(--text-base); margin-bottom: var(--space-3); color: var(--accent-danger);">Attendance Warning</h3>
        <p style="font-size: var(--text-sm); color: var(--text-secondary); line-height: 1.7;">
          ${aktu?.attendance?.consequence || 'Below 75% = debarred from Class Test (CTS) for that subject'}.
          ${aktu?.attendance?.tip || 'Track from Week 1.'}
        </p>
      </div>

      <div class="card" style="border-left: 3px solid var(--accent-2);">
        <h3 style="font-size: var(--text-base); margin-bottom: var(--space-3); color: var(--accent-2);">Internal Marks (30 total)</h3>
        <p style="font-size: var(--text-sm); color: var(--text-secondary); line-height: 1.7;">
          ${aktu?.internalMarks?.breakdown || 'Based on class tests, assignments, attendance and behaviour.'}
        </p>
      </div>
    `;
  }

  const CATEGORY_MAP = {
    'GEN': ['OPEN', 'OPEN(GIRL)'],
    'OBC': ['BC', 'BC(Girl)', 'EWS(OPEN)', 'EWS(GL)'],
    'SC': ['SC', 'SC(Girl)'],
    'ST': ['ST'],
    'EWS': ['EWS(OPEN)', 'EWS(GL)']
  };

  function initRankPredictor() {
    const branchSelect = $('#branch-select');
    branchSelect.innerHTML = '';
    collegeData.branches.forEach(b => {
      const opt = document.createElement('option');
      opt.value = b.id;
      opt.textContent = b.name;
      branchSelect.appendChild(opt);
    });

    $('#predict-btn').addEventListener('click', () => {
      const rank = parseInt($('#rank-input').value);
      const category = $('#category-select').value;
      const branchId = $('#branch-select').value;

      if (!rank || rank < 1) {
        showPredictionResult('error', 'Please enter a valid rank', null, null);
        return;
      }

      const branch = collegeData.branches.find(b => b.id === branchId);
      if (!branch || !branch.uptac2025) {
        showPredictionResult('error', 'No data available for this branch', null, null);
        return;
      }

      const allowedCats = CATEGORY_MAP[category] || [];

      const matchingRounds = branch.uptac2025.rounds.filter(r => allowedCats.includes(r.category));

      if (!matchingRounds.length) {
        showPredictionResult('error', `No 2025 UPTAC data found for ${category} in ${branch.name}`, null, null);
        return;
      }

      const maxRound = Math.max(...matchingRounds.map(r => r.round));
      const lastRoundEntries = matchingRounds.filter(r => r.round === maxRound);
      const bestClosing = Math.min(...lastRoundEntries.map(r => r.closing));
      const bestOpening = Math.min(...lastRoundEntries.map(r => r.opening));

      const round1Entries = matchingRounds.filter(r => r.round === 1);
      const round1Closing = round1Entries.length ? Math.min(...round1Entries.map(r => r.closing)) : null;

      let status, message;
      const margin = Math.round(bestClosing * 0.15);

      if (rank <= bestOpening) {
        status = 'confirm';
        message = ` VERY HIGH CHANCE — Your rank ${rank.toLocaleString()} is within the opening rank of ${bestOpening.toLocaleString()} for ${category} in ${branch.name} (Round ${maxRound}, 2025 data).`;
      } else if (rank <= bestClosing) {
        status = 'confirm';
        message = ` GOOD CHANCE — Your rank ${rank.toLocaleString()} is within the closing rank of ${bestClosing.toLocaleString()} for ${category} in ${branch.name} (Round ${maxRound}, 2025 data).`;
      } else if (rank <= bestClosing + margin) {
        status = 'borderline';
        message = ` BORDERLINE — Your rank ${rank.toLocaleString()} is slightly above the closing rank of ${bestClosing.toLocaleString()}. You may get a chance in spot/later rounds (${category}, ${branch.name}).`;
      } else {
        status = 'nochance';
        message = ` UNLIKELY — Your rank ${rank.toLocaleString()} is above the closing rank of ${bestClosing.toLocaleString()} for ${category} in ${branch.name} (2025 data).`;
      }

      showPredictionResult(status, message, branch, matchingRounds);
    });
  }

  function showPredictionResult(status, message, branch, rounds) {
    const container = $('#prediction-result');
    container.classList.remove('hidden');

    let tableHTML = '';
    if (rounds && rounds.length) {
      const groupedByRound = {};
      rounds.forEach(r => {
        if (!groupedByRound[r.round]) groupedByRound[r.round] = [];
        groupedByRound[r.round].push(r);
      });
      tableHTML = `
        <div class="result-details" style="margin-top: var(--space-5);">
          <h4 style="font-size: var(--text-sm); color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: var(--space-3);"> 2025 UPTAC OR-CR Data — <a href="https://uptac.admissions.nic.in/or-cr/" target="_blank" rel="noopener" style="color: var(--accent-blue);">Official Source ↗</a></h4>
          <table class="data-table">
            <thead><tr><th>Round</th><th>Category</th><th>Quota</th><th>Opening</th><th>Closing</th></tr></thead>
            <tbody>
              ${Object.entries(groupedByRound).map(([round, entries]) =>
        entries.map(r => `<tr><td>Round ${r.round}</td><td>${r.category}</td><td>${r.quota}</td><td>${r.opening.toLocaleString()}</td><td>${r.closing.toLocaleString()}</td></tr>`).join('')
      ).join('')}
            </tbody>
          </table>
        </div>`;
    }

    container.innerHTML = `
      <div style="text-align: center; margin-top: var(--space-6);">
        <div class="result-tag ${status}">${message}</div>
      </div>
      ${tableHTML}
    `;
  }

  function initFeeCalculator() {

    const select = $('#fee-category-select');
    select.innerHTML = `
      <option value="GEN_MALE">General — Boys</option>
      <option value="GEN_FEMALE">General — Girls</option>
      <option value="OBC_MALE">OBC — Boys</option>
      <option value="OBC_FEMALE">OBC — Girls</option>
      <option value="SC_MALE">SC — Boys</option>
      <option value="SC_FEMALE">SC — Girls</option>
      <option value="ST_MALE">ST — Boys</option>
      <option value="EWS_MALE">EWS — Boys</option>
      <option value="EWS_FEMALE">EWS — Girls</option>
    `;

    const renderFee = () => {
      const catKey = select.value;
      const fee = collegeData.feeStructure;
      const scholarship = fee.scholarship[catKey];
      const components = fee.components;

      let html = '<div style="margin-top: var(--space-4);">';
      html += feeItem('College Fee', components.collegeFee);
      html += feeItem('User Charges', components.userCharges);
      html += feeItem('Caution Money (One-time)', components.cautionMoney);
      html += feeItem('AKTU University Fees', components.aktuFees);
      html += feeItem('Total Annual Fee', fee.totalWithoutHostel, true);

      if (scholarship && scholarship.eligible) {
        const effectiveCost = Math.max(0, fee.totalWithoutHostel - scholarship.amount);
        html += `<div class="fee-breakdown-item scholarship">
          <span> UP Govt Scholarship</span>
          <span class="fee-amount" style="color: var(--accent-mint);">− ₹${scholarship.amount.toLocaleString()}</span>
        </div>`;
        html += `<div class="fee-breakdown-item total">
          <span> Effective Annual Cost (After Scholarship)</span>
          <span class="fee-amount" style="color: var(--accent-mint);">₹${effectiveCost.toLocaleString()}</span>
        </div>`;
        if (scholarship.incomeLimit) {
          html += `<p style="margin-top: var(--space-3); font-size: var(--text-xs); color: var(--text-muted);">* Income limit: ₹${(scholarship.incomeLimit / 100000).toFixed(1)} Lakhs/year &nbsp;|&nbsp; Apply at <a href="https://scholarship.up.gov.in" target="_blank" style="color: var(--accent-blue);">scholarship.up.gov.in</a></p>`;
        }
      } else {
        html += `<div class="fee-breakdown-item total">
          <span> Annual Cost</span>
          <span class="fee-amount">₹${fee.totalWithoutHostel.toLocaleString()}</span>
        </div>`;
      }

      html += `<div style="margin-top: var(--space-5); padding: var(--space-4); background: var(--accent-mint-dim); border-radius: var(--radius-md);">
        <p style="font-size: var(--text-sm); color: var(--accent-mint); font-weight: 600; margin-bottom: var(--space-2);"> Scholarship Reference</p>
        <div style="font-size: var(--text-xs); color: var(--text-secondary); line-height: 1.8;">
          General Boys: ~₹58,000 &nbsp;|&nbsp; General Girls: ~₹63,000<br>
          OBC Boys: ~₹53,000 &nbsp;|&nbsp; OBC Girls: ~₹58,000<br>
          SC Boys: ~₹66,000 &nbsp;|&nbsp; SC Girls: ~₹71,000<br>
          ST Boys: ~₹66,000 (Girls amount unconfirmed)
        </div>
        <a href="${fee.feecircularUrl}" target="_blank" rel="noopener" style="display: inline-block; margin-top: var(--space-3); font-size: var(--text-xs); color: var(--accent-blue);"> Download Fee Circular from Official Website ↗</a>
      </div>`;

      html += `<div style="margin-top: var(--space-4); padding: var(--space-4); background: var(--accent-dim); border-radius: var(--radius-md);">
        <p style="font-size: var(--text-sm); color: var(--accent);"> <strong>Girls Hostel Only:</strong> Add ₹${components.hostelFee.toLocaleString()}/year (Boys rent outside — ₹1,000–₹2,000/month)</p>
      </div>`;

      html += '</div>';
      $('#fee-breakdown').innerHTML = html;
    };

    select.addEventListener('change', renderFee);
    renderFee();
  }

  function feeItem(label, amount, isSubtotal) {
    return `<div class="fee-breakdown-item ${isSubtotal ? 'total' : ''}">
      <span>${label}</span>
      <span class="fee-amount">₹${amount.toLocaleString()}</span>
    </div>`;
  }

  function initBudgetPlanner() {
    const budget = collegeData.monthlyBudget;
    const container = $('#budget-list');

    const categories = [
      {
        icon: '', label: 'Room Rent',
        range: `₹${budget.rent.min.toLocaleString()} – ₹${budget.rent.max.toLocaleString()}/month`,
        note: budget.rent.note
      },
      {
        icon: '', label: 'Food & Meals',
        range: `₹${budget.food.min.toLocaleString()} – ₹${budget.food.max.toLocaleString()}/month`,
        note: budget.food.note
      },
      {
        icon: '', label: 'Transport',
        range: `₹10–₹20 per ride`,
        note: budget.transport.note
      },
      {
        icon: '', label: 'Internet / Mobile',
        range: `₹${budget.internet.min.toLocaleString()} – ₹${budget.internet.max.toLocaleString()}/month`,
        note: budget.internet.note
      },
      {
        icon: '', label: 'Miscellaneous',
        range: `₹${budget.miscellaneous.min.toLocaleString()} – ₹${budget.miscellaneous.max.toLocaleString()}/month`,
        note: budget.miscellaneous.note
      }
    ];

    let html = '<div style="display: flex; flex-direction: column; gap: var(--space-3);">';
    categories.forEach(cat => {
      html += `
        <div style="display: flex; gap: var(--space-4); padding: var(--space-4); background: var(--bg-card); border-radius: var(--radius-md); border: 1px solid var(--border-color); align-items: flex-start;">
          <div style="font-size: 1.8rem; flex-shrink: 0;">${cat.icon}</div>
          <div style="flex: 1;">
            <div style="font-weight: 600; color: var(--text-heading); margin-bottom: 4px;">${cat.label}</div>
            <div style="font-size: var(--text-xs); color: var(--text-muted); line-height: 1.6;">${cat.note}</div>
          </div>
          <div style="font-weight: 700; color: var(--accent); font-size: var(--text-sm); white-space: nowrap; flex-shrink: 0;">${cat.range}</div>
        </div>
      `;
    });

    html += `</div>
    <div style="margin-top: var(--space-6); padding: var(--space-5); background: var(--accent-mint-dim); border-radius: var(--radius-md); text-align: center;">
      <div style="font-size: var(--text-xs); color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: var(--space-2);">Estimated Monthly Total</div>
      <div style="font-size: var(--text-2xl); font-weight: 800; color: var(--accent-mint);">₹3,200 – ₹7,500</div>
      <div style="font-size: var(--text-xs); color: var(--text-muted); margin-top: var(--space-2);">Varies based on lifestyle, room type, and eating habits</div>
    </div>`;

    container.innerHTML = html;
  }

  function renderFitGuide() {
    const fit = collegeData.fitGuide;
    const container = $('#fit-columns');

    const greenItems = fit.bestSuitedFor.map(item => `
      <div class="fit-item"><span></span><span>${item}</span></div>
    `).join('');

    container.innerHTML = `
      <div class="fit-column green" style="grid-column: 1 / -1; max-width: 700px; margin: 0 auto;">
        <div class="fit-column-title"> Best Suited For You If...</div>
        ${greenItems}
      </div>
    `;
  }

  function renderCampusLifeGuide() {
    const container = $('#campus-life-grid');
    const items = collegeData.campusLifeGuide;

    container.innerHTML = items.map(item => `
      <div class="life-card">
        <div class="life-card-title">${item.factor}</div>
        <div class="life-card-info">${item.info}</div>
        <div class="life-card-tip">${item.proTip}</div>
        ${item.costRange ? `<div class="life-card-cost">${item.costRange}</div>` : ''}
      </div>
    `).join('');

    const sports = collegeData.sports;
    if (sports && sports.length) {
      const sportsSection = document.createElement('div');
      sportsSection.style.cssText = 'margin-top: var(--space-10);';
      sportsSection.innerHTML = `
        <h3 style="font-size: var(--text-xl); font-weight: 700; color: var(--text-heading); margin-bottom: var(--space-2);">Sports on Campus</h3>
        <p style="font-size: var(--text-sm); color: var(--text-muted); margin-bottom: var(--space-6);">Intercollegiate and intra-college events organised by the Sports Council</p>
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: var(--space-3);">
          ${sports.map(s => `
            <div style="padding: var(--space-4); background: var(--bg-card); border: 1px solid var(--border-color); border-radius: var(--radius-lg); transition: border-color 0.2s;"
                 onmouseover="this.style.borderColor='var(--accent)'" onmouseout="this.style.borderColor='var(--border-color)'">
              <div style="font-weight: 700; font-size: var(--text-sm); color: var(--text-heading); margin-bottom: var(--space-1);">${s.name}</div>
              <div style="font-size: var(--text-xs); color: ${s.level === 'Intercollegiate' ? 'var(--accent-2)' : 'var(--accent-warn)'}; font-weight: 600; margin-bottom: var(--space-2);">${s.level}</div>
              <div style="font-size: var(--text-xs); color: var(--text-muted); line-height: 1.5;">${s.note}</div>
            </div>
          `).join('')}
        </div>
      `;
      container.parentElement.appendChild(sportsSection);
    }
  }

  function renderBranchReviews() {
    const container = $('#branch-accordion');
    const branches = collegeData.branches;

    container.innerHTML = branches.map((b, i) => {
      return `
      <div class="accordion-item ${i === 0 ? 'open' : ''}" data-branch="${b.id}">
        <div class="accordion-header" onclick="this.parentElement.classList.toggle('open')">
          <div>
            <h3>${b.name}</h3>
            <span style="font-size: var(--text-sm); color: var(--text-muted);">${b.seats} seats</span>
          </div>
          <span class="accordion-arrow">▼</span>
        </div>
        <div class="accordion-body">
          <div class="accordion-body-inner">
            <div class="grid-2" style="gap: var(--space-4);">
              ${branchInfoCard(' Lab Status', b.review.labStatus)}
              ${branchInfoCard(' Faculty', b.review.facultyRating)}
              ${branchInfoCard(' Scope & Career', b.review.scope)}
              ${branchInfoCard(' Placement Note', b.review.placementNote)}
            </div>
          </div>
        </div>
      </div>
    `;
    }).join('');
  }

  function branchInfoCard(title, text) {
    return `<div style="padding: var(--space-4); background: var(--bg-card); border-radius: var(--radius-md); border: 1px solid var(--border-color);">
      <div style="font-size: var(--text-sm); font-weight: 700; color: var(--text-heading); margin-bottom: var(--space-2);">${title}</div>
      <div style="font-size: var(--text-sm); color: var(--text-secondary); line-height: 1.6;">${text}</div>
    </div>`;
  }

  function renderGalleryVideos() {
    const container = $('#gallery-grid');
    const videos = collegeData.galleryVideos;
    if (!container || !videos || !videos.length) return;

    container.innerHTML = `
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: var(--space-5);">
        ${videos.map(v => `
          <div class="card" style="padding: 0; overflow: hidden;">
            <div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;">
              <iframe
                src="https://www.youtube.com/embed/${v.id}"
                title="${v.title}"
                style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
                loading="lazy">
              </iframe>
            </div>
            <div style="padding: var(--space-4);">
              <div style="font-weight: 700; font-size: var(--text-sm); color: var(--text-heading); margin-bottom: var(--space-1);">${v.title}</div>
              <div style="font-size: var(--text-xs); color: var(--text-muted); line-height: 1.5;">${v.description}</div>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  function renderPlacementReality() {
    const p = collegeData.placementData;
    const container = $('#placement-content');

    container.innerHTML = `
      <p style="font-size: var(--text-base); color: var(--text-secondary); text-align: center; margin-bottom: var(--space-8); max-width: 700px; margin-left: auto; margin-right: auto;">${p.overview}</p>

      <div class="grid-2" style="margin-bottom: var(--space-8);">
        <div class="card">
          <h3 style="color: var(--accent-mint); margin-bottom: var(--space-4);"> On-Campus</h3>
          <div class="stat-grid" style="grid-template-columns: 1fr; gap: var(--space-3); margin-bottom: var(--space-4);">
            <div style="padding: var(--space-3); background: var(--bg-input); border-radius: var(--radius-md);">
              <span style="font-size: var(--text-xs); color: var(--text-muted);">Status:</span>
              <span style="font-size: var(--text-sm); font-weight: 600; color: var(--accent-amber);"> ${p.onCampus.status}</span>
            </div>
            <div style="padding: var(--space-3); background: var(--bg-input); border-radius: var(--radius-md);">
              <span style="font-size: var(--text-xs); color: var(--text-muted);">Avg Package:</span>
              <span style="font-size: var(--text-sm); font-weight: 600; color: var(--accent-mint);"> ${p.onCampus.avgPackage}</span>
            </div>
          </div>
          <p style="font-size: var(--text-sm); color: var(--text-secondary);">${p.onCampus.note}</p>
        </div>

        <div class="card">
          <h3 style="color: var(--accent-blue); margin-bottom: var(--space-4);"> Off-Campus</h3>
          <div class="stat-grid" style="grid-template-columns: 1fr; gap: var(--space-3); margin-bottom: var(--space-4);">
            <div style="padding: var(--space-3); background: var(--bg-input); border-radius: var(--radius-md);">
              <span style="font-size: var(--text-xs); color: var(--text-muted);">Status:</span>
              <span style="font-size: var(--text-sm); font-weight: 600; color: var(--accent-mint);"> ${p.offCampus.status}</span>
            </div>
            <div style="padding: var(--space-3); background: var(--bg-input); border-radius: var(--radius-md);">
              <span style="font-size: var(--text-xs); color: var(--text-muted);">Avg Package:</span>
              <span style="font-size: var(--text-sm); font-weight: 600; color: var(--accent-mint);"> ${p.offCampus.avgPackage}</span>
            </div>
          </div>
          <p style="font-size: var(--text-sm); color: var(--text-secondary);">${p.offCampus.note}</p>
        </div>
      </div>

      <div class="card" style="max-width: 700px; margin: 0 auto;">
        <h3 style="color: var(--accent-amber); margin-bottom: var(--space-4);"> How to Prepare — Tips That Actually Work</h3>
        ${p.tips.map(tip => `
          <div class="checklist-item">
            <div class="checklist-bullet" style="background: var(--accent-amber);"></div>
            <div class="checklist-text">${tip}</div>
          </div>
        `).join('')}
      </div>
    `;
  }

  function renderFirstWeekKit() {
    const kit = collegeData.firstWeekKit;
    const container = $('#first-week-content');

    container.innerHTML = `
      <div class="tabs" id="first-week-tabs">
        <button class="tab-btn active" data-tab="fw-pack"> What to Pack</button>
        <button class="tab-btn" data-tab="fw-day1"> Day 1 Tips</button>
      </div>

      <div class="tab-content active" id="fw-pack">
        ${kit.essentials.map(item => `
          <div class="checklist-item">
            <div class="checklist-bullet" style="background: var(--accent-amber);"></div>
            <div class="checklist-text">${item}</div>
          </div>
        `).join('')}
      </div>

      <div class="tab-content" id="fw-day1">
        ${kit.day1Tips.map(tip => `
          <div class="checklist-item">
            <div class="checklist-bullet" style="background: var(--accent-blue);"></div>
            <div class="checklist-text">${tip}</div>
          </div>
        `).join('')}
      </div>
    `;

    initTabs('first-week-tabs');
  }

  function renderDocChecklist() {
    const docs = collegeData.counselingDocChecklist;
    const container = $('#doc-checklist-content');

    container.innerHTML = `
      <div class="tabs" id="doc-tabs">
        <button class="tab-btn active" data-tab="doc-mandatory"> Mandatory</button>
        <button class="tab-btn" data-tab="doc-category"> Category-Specific</button>
        <button class="tab-btn" data-tab="doc-tips"> Pro Tips</button>
      </div>

      <div class="tab-content active" id="doc-mandatory">
        ${docs.mandatory.map(d => `
          <div class="checklist-item" style="flex-direction: column; align-items: flex-start; gap: var(--space-1); padding: var(--space-4);">
            <div style="display: flex; align-items: center; gap: var(--space-3);">
              <div class="checklist-bullet"></div>
              <span class="checklist-text" style="font-weight: 600;">${d.doc}</span>
            </div>
            <div class="checklist-tip" style="margin-left: 20px;"> ${d.tip}</div>
          </div>
        `).join('')}
      </div>

      <div class="tab-content" id="doc-category">
        ${docs.categorySpecific.map(d => `
          <div class="checklist-item" style="flex-direction: column; align-items: flex-start; gap: var(--space-1); padding: var(--space-4);">
            <div style="display: flex; align-items: center; gap: var(--space-3);">
              <div class="checklist-bullet" style="background: var(--accent-amber);"></div>
              <span class="checklist-text" style="font-weight: 600;">${d.doc}</span>
              <span style="font-size: var(--text-xs); padding: 2px 8px; background: var(--accent-purple-dim); color: var(--accent-purple); border-radius: var(--radius-full);">${d.for}</span>
            </div>
            <div class="checklist-tip" style="margin-left: 20px;"> ${d.tip}</div>
          </div>
        `).join('')}
      </div>

      <div class="tab-content" id="doc-tips">
        ${docs.proTips.map(tip => `
          <div class="checklist-item">
            <div class="checklist-bullet" style="background: var(--accent-amber);"></div>
            <div class="checklist-text">${tip}</div>
          </div>
        `).join('')}
      </div>
    `;

    initTabs('doc-tabs');
  }

  function renderHowToReach() {
    const reach = collegeData.howToReach;
    const container = $('#reach-content');

    container.innerHTML = `
      <div class="card-glass" style="max-width: 700px; margin: 0 auto var(--space-8);">
        <h3 style="color: var(--accent-2); margin-bottom: var(--space-4);">Getting There</h3>
        <div class="fee-breakdown-item">
          <span>Nearest Railway Station</span>
          <span class="fee-amount" style="color: var(--accent-2);">${reach.nearestRailway}</span>
        </div>
        <div class="fee-breakdown-item">
          <span>Nearest Bus Stand</span>
          <span class="fee-amount" style="color: var(--accent-2);">${reach.nearestBus}</span>
        </div>
        <div class="fee-breakdown-item">
          <span>College Location</span>
          <span class="fee-amount">${reach.fromStation.distance}</span>
        </div>
        <div class="fee-breakdown-item">
          <span>Mode of Transport</span>
          <span class="fee-amount">${reach.fromStation.mode}</span>
        </div>
        <div class="fee-breakdown-item">
          <span>Auto Fare (local areas)</span>
          <span class="fee-amount" style="color: var(--accent-warn);">${reach.fromStation.autoFareLocal}</span>
        </div>
        <div class="fee-breakdown-item">
          <span>Auto Fare (Bus Stand / Railway Station)</span>
          <span class="fee-amount" style="color: var(--accent-warn);">${reach.fromStation.autoFareStation}</span>
        </div>
        <div class="fee-breakdown-item">
          <span>Travel Time</span>
          <span class="fee-amount">${reach.fromStation.time}</span>
        </div>
      </div>

      <div style="border-radius: var(--radius-xl); overflow: hidden; border: 1px solid var(--border-color); margin-bottom: var(--space-8);">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3550.7740978676584!2d81.9774459754895!3d27.131924376517137!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3999f182ab811423%3A0x44782e6c59de62ea!2z4KSw4KS-4KSc4KSV4KWA4KSvIOCkh-CkguCknOClgOCkqOCkv-Ckr-CksOCkv-CkguCklyDgpJXgpYngpLLgpYfgpJwgLSDgpIngpKTgpLDgpYzgpLLgpL4g4KSw4KWL4KShIC0g4KSX4KWL4KSC4KSh4KS-IOClpA!5e0!3m2!1sen!2sin!4v1782040506547!5m2!1sen!2sin"
          width="100%"
          height="400"
          style="border:0; display:block;"
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade">
        </iframe>
      </div>

      <h3 style="text-align: center; color: var(--text-heading); margin-bottom: var(--space-6);">Nearby Essentials</h3>
      <div class="nearby-grid">
        ${reach.nearbyEssentials.map(item => `
          <div class="nearby-item">
            <div>
              <div class="nearby-name">${item.type}</div>
              <div class="nearby-distance">${item.name} &mdash; ${item.distance}</div>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  function renderAKTUDecoded() {
    const aktu = collegeData.aktuExamSystem;
    const container = $('#aktu-content');

    container.innerHTML = `
      <p style="text-align: center; color: var(--text-secondary); margin-bottom: var(--space-8); max-width: 700px; margin-left: auto; margin-right: auto;">${aktu.overview}</p>

      <div class="tabs" id="aktu-tabs">
        <button class="tab-btn active" data-tab="aktu-exam"> Exam Pattern</button>
        <button class="tab-btn" data-tab="aktu-internal"> Internal Marks</button>
        <button class="tab-btn" data-tab="aktu-attendance"> Attendance</button>
        <button class="tab-btn" data-tab="aktu-carry"> Carry Paper</button>
        <button class="tab-btn" data-tab="aktu-grading"> Grading</button>
      </div>

      <div class="tab-content active" id="aktu-exam">
        <div class="card" style="max-width: 600px; margin: 0 auto;">
          <h3 style="color: var(--accent-2); margin-bottom: var(--space-4);"> Theory Papers</h3>
          <div class="fee-breakdown-item"><span>Max Marks</span><span class="fee-amount">${aktu.examPattern.theory.maxMarks}</span></div>
          <div class="fee-breakdown-item"><span>Internal</span><span class="fee-amount">${aktu.examPattern.theory.internal}</span></div>
          <div class="fee-breakdown-item"><span>External (End-Sem)</span><span class="fee-amount">${aktu.examPattern.theory.external}</span></div>
          <div class="fee-breakdown-item"><span>Pass in External (min)</span><span class="fee-amount" style="color: var(--accent-danger);">${aktu.examPattern.theory.passingExternal}</span></div>
          <div style="margin-top: var(--space-4); padding: var(--space-3); background: var(--accent-danger-dim); border-radius: var(--radius-md); font-size: var(--text-sm); color: var(--accent-danger);">
             ${aktu.examPattern.theory.note}
          </div>
        </div>
      </div>

      <div class="tab-content" id="aktu-internal">
        <div class="card" style="max-width: 600px; margin: 0 auto;">
          <h3 style="color: var(--accent-amber); margin-bottom: var(--space-4);"> Internal Marks (Out of ${aktu.internalMarks.total})</h3>
          <div style="padding: var(--space-4); background: var(--bg-input); border-radius: var(--radius-md); font-size: var(--text-sm); color: var(--text-secondary); line-height: 1.8;">
            ${aktu.internalMarks.breakdown}
          </div>
        </div>
      </div>

      <div class="tab-content" id="aktu-attendance">
        <div class="card" style="max-width: 600px; margin: 0 auto;">
          <div style="text-align: center; margin-bottom: var(--space-6);">
            <div style="font-size: var(--text-5xl); font-weight: 900; color: var(--accent-crimson);">${aktu.attendance.minimum}</div>
            <div style="font-size: var(--text-sm); color: var(--text-secondary); text-transform: uppercase;">Minimum Attendance Required</div>
          </div>
          <div style="padding: var(--space-4); background: var(--accent-crimson-dim); border-radius: var(--radius-md); margin-bottom: var(--space-4);">
            <p style="font-size: var(--text-sm); color: var(--accent-crimson); font-weight: 600;"> ${aktu.attendance.consequence}</p>
          </div>
          <div style="padding: var(--space-4); background: var(--accent-mint-dim); border-radius: var(--radius-md);">
            <p style="font-size: var(--text-sm); color: var(--accent-mint);"> ${aktu.attendance.tip}</p>
          </div>
        </div>
      </div>

      <div class="tab-content" id="aktu-carry">
        <div class="card" style="max-width: 600px; margin: 0 auto;">
          <h3 style="color: var(--accent-amber); margin-bottom: var(--space-4);"> Carry Paper System</h3>
          <div class="checklist-item" style="padding: var(--space-4);">
            <div class="checklist-bullet" style="background: var(--accent-amber);"></div>
            <div>
              <div class="checklist-text" style="font-weight: 600;">What is a Carry Paper?</div>
              <div class="checklist-tip">${aktu.carryBackPaper.carry}</div>
            </div>
          </div>
          <div style="margin-top: var(--space-4); padding: var(--space-4); background: var(--accent-mint-dim); border-radius: var(--radius-md);">
            <p style="font-size: var(--text-sm); color: var(--accent-mint);"> ${aktu.carryBackPaper.tip}</p>
          </div>
        </div>
      </div>

      <div class="tab-content" id="aktu-grading">
        <div style="max-width: 600px; margin: 0 auto;">
          <div class="grade-grid" style="margin-bottom: var(--space-6);">
            ${aktu.grading.scale.map(g => `
              <div class="grade-chip">
                <span class="grade-letter">${g.grade}</span>
                <span class="grade-range">${g.range}</span>
                <span class="grade-point">${g.point}</span>
              </div>
            `).join('')}
          </div>
          <div class="card">
            <h4 style="color: var(--accent-mint); margin-bottom: var(--space-3);"> SGPA Formula</h4>
            <code style="font-family: var(--font-mono); font-size: var(--text-sm); color: var(--accent-amber); background: var(--bg-input); padding: var(--space-2) var(--space-4); border-radius: var(--radius-md); display: block;">${aktu.grading.sgpaFormula}</code>
            <h4 style="color: var(--accent-mint); margin-top: var(--space-5); margin-bottom: var(--space-3);"> CGPA Formula</h4>
            <code style="font-family: var(--font-mono); font-size: var(--text-sm); color: var(--accent-amber); background: var(--bg-input); padding: var(--space-2) var(--space-4); border-radius: var(--radius-md); display: block;">${aktu.grading.cgpaFormula}</code>
          </div>
        </div>
      </div>
    `;

    initTabs('aktu-tabs');
  }

  function renderHowCollegeWorks() {
    const aktu = collegeData.aktuExamSystem;
    const hw = aktu.howCollegeWorks;
    const container = $('#how-college-works-content');
    if (!container) return;

    container.innerHTML = `
      <div style="max-width: 800px; margin: 0 auto;">
        <div class="grid-2" style="gap: var(--space-5); margin-bottom: var(--space-6);">
          <div class="card" style="border-left: 3px solid var(--accent-blue);">
            <div style="font-size: var(--text-xs); color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: var(--space-2);"> Academic Calendar</div>
            <div style="font-size: var(--text-sm); color: var(--text-secondary); line-height: 1.8;">${hw.academicCalendar}</div>
          </div>
          <div class="card" style="border-left: 3px solid var(--accent-amber);">
            <div style="font-size: var(--text-xs); color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: var(--space-2);"> Class Timings</div>
            <div style="font-size: var(--text-sm); color: var(--text-secondary); line-height: 1.8;">${hw.classTimings}</div>
          </div>
        </div>
        <div class="card-glass">
          <h3 style="color: var(--accent-purple); margin-bottom: var(--space-5);"> Things You Should Know</h3>
          <div style="display: flex; flex-direction: column; gap: var(--space-3);">
            ${hw.importantThings.map(thing => `
              <div class="checklist-item">
                <div class="checklist-bullet" style="background: var(--accent-purple);"></div>
                <div class="checklist-text">${thing}</div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }

  function renderComparison() {
    const colleges = collegeData.comparison.colleges;
    const container = $('#comparison-content');
    const fields = ['type', 'established', 'fees', 'branches', 'hostel', 'location', 'placement', 'scholarshipFriendly', 'bestFor'];
    const labels = {
      type: 'Type', established: 'Established', fees: 'Annual Fees', branches: 'Branches',
      hostel: 'Hostel', location: 'Location', placement: 'Placement', scholarshipFriendly: 'Scholarship Friendly', bestFor: 'Best For'
    };

    let html = '<table class="data-table"><thead><tr><th>Parameter</th>';
    colleges.forEach(c => { html += `<th>${c.name}</th>`; });
    html += '</tr></thead><tbody>';

    fields.forEach(field => {
      html += `<tr><td style="font-weight: 600; color: var(--accent-mint);">${labels[field]}</td>`;
      colleges.forEach(c => { html += `<td>${c[field]}</td>`; });
      html += '</tr>';
    });

    html += '</tbody></table>';
    container.innerHTML = html;
  }

  function renderTimeline() {
    const events = collegeData.importantDates.events;
    const container = $('#dates-content');

    let html = `<p style="text-align: center; font-size: var(--text-sm); color: var(--text-muted); margin-bottom: var(--space-6);">
       ${collegeData.importantDates.note}
    </p><div class="timeline">`;

    events.forEach(ev => {
      html += `
        <div class="timeline-item">
          <div class="timeline-dot"></div>
          <div class="timeline-date">${ev.icon} ${ev.date}</div>
          <div class="timeline-title">${ev.event}</div>
        </div>
      `;
    });

    html += '</div>';
    container.innerHTML = html;
  }

  function renderLinksHub() {
    const links = collegeData.usefulLinks;
    const container = $('#links-content');

    const grouped = {};
    links.forEach(link => {
      if (!grouped[link.category]) grouped[link.category] = [];
      grouped[link.category].push(link);
    });

    let html = '';
    Object.entries(grouped).forEach(([category, items]) => {
      html += `<div class="links-category">
        <div class="links-category-title">${category}</div>
        <div class="grid-3">
          ${items.map(link => `
            <a href="${link.url}" target="_blank" rel="noopener" class="link-card">
              <span class="link-card-icon">${link.icon}</span>
              <div>
                <div class="link-card-name">${link.name}</div>
                <div class="link-card-category">${link.url.replace('https://', '').split('/')[0]}</div>
              </div>
            </a>
          `).join('')}
        </div>
      </div>`;
    });

    container.innerHTML = html;
  }

  function renderROI() {
    const roi = collegeData.roiComparison;
    const container = $('#roi-content');
    const maxCost = roi.metroPrivateCollege.fourYearTotal;
    const recMidMax = roi.recGonda.fourYearTotalMax;
    const recMidMin = roi.recGonda.fourYearTotalMin;

    container.innerHTML = `
      <div style="max-width: 800px; margin: 0 auto;">
        <h3 style="text-align: center; color: var(--text-heading); margin-bottom: var(--space-8);">4-Year Total Cost Comparison</h3>

        <div class="roi-bar-container">
          <div class="roi-bar-label">
            <span style="color: var(--accent-mint);">${collegeData.collegeName}</span>
            <span style="color: var(--accent-mint); font-family: var(--font-mono);">₹${(recMidMin / 100000).toFixed(1)}L – ₹${(recMidMax / 100000).toFixed(1)}L</span>
          </div>
          <div class="roi-bar">
            <div class="roi-bar-fill mint" style="width: ${(recMidMax / maxCost * 100).toFixed(0)}%;">
              ₹${(recMidMin / 100000).toFixed(1)}–${(recMidMax / 100000).toFixed(1)}L
            </div>
          </div>
        </div>

        <div class="roi-bar-container">
          <div class="roi-bar-label">
            <span style="color: var(--accent-crimson);">${roi.metroPrivateCollege.name}</span>
            <span style="color: var(--accent-crimson); font-family: var(--font-mono);">₹${(roi.metroPrivateCollege.fourYearTotal / 100000).toFixed(1)}L</span>
          </div>
          <div class="roi-bar">
            <div class="roi-bar-fill crimson" style="width: 100%;">
              ₹${(roi.metroPrivateCollege.fourYearTotal / 100000).toFixed(1)}L
            </div>
          </div>
        </div>

        <div class="grid-2" style="margin-top: var(--space-8);">
          <div class="card" style="text-align: center;">
            <div style="font-size: var(--text-xs); color: var(--text-muted); text-transform: uppercase; margin-bottom: var(--space-2);">${collegeData.collegeName} — Yearly Estimate</div>
            <div style="font-size: var(--text-sm); color: var(--text-secondary);">
              Fees: ₹${roi.recGonda.yearlyFees.toLocaleString()} + Living: ₹${roi.recGonda.yearlyLivingMin.toLocaleString()}–₹${roi.recGonda.yearlyLivingMax.toLocaleString()}
            </div>
            <div style="font-size: var(--text-xl); font-weight: 800; color: var(--accent-mint); margin-top: var(--space-2);">
              ₹${roi.recGonda.yearlyTotalMin.toLocaleString()} – ₹${roi.recGonda.yearlyTotalMax.toLocaleString()}/year
            </div>
          </div>
          <div class="card" style="text-align: center;">
            <div style="font-size: var(--text-xs); color: var(--text-muted); text-transform: uppercase; margin-bottom: var(--space-2);">Private College (Metro) — Yearly</div>
            <div style="font-size: var(--text-sm); color: var(--text-secondary);">
              Fees: ₹${roi.metroPrivateCollege.yearlyFees.toLocaleString()} + Living: ₹${roi.metroPrivateCollege.yearlyLiving.toLocaleString()}
            </div>
            <div style="font-size: var(--text-xl); font-weight: 800; color: var(--accent-crimson); margin-top: var(--space-2);">
              ₹${roi.metroPrivateCollege.yearlyTotal.toLocaleString()}/year
            </div>
          </div>
        </div>

        <div class="roi-savings-card">
          <div style="font-size: var(--text-sm); color: var(--text-secondary); text-transform: uppercase; letter-spacing: 0.08em;">Your Advantage</div>
          <div class="roi-savings-amount">₹${((maxCost - recMidMax) / 100000).toFixed(1)}L – ₹${((maxCost - recMidMin) / 100000).toFixed(1)}L Saved</div>
          <div class="roi-savings-note">${roi.savings.note}</div>
        </div>
      </div>
    `;

    setTimeout(() => {
      const bars = container.querySelectorAll('.roi-bar-fill');
      bars.forEach(bar => {
        const target = bar.style.width;
        bar.style.width = '0%';
        setTimeout(() => { bar.style.width = target; }, 100);
      });
    }, 300);
  }

  function initThemeToggle() {
    const btn = $('#theme-toggle');
    const label = $('#theme-toggle-label');
    if (!btn) return;

    const saved = localStorage.getItem('ci-theme');
    if (saved === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
      btn.querySelector('.theme-toggle-icon').textContent = 'Light';
      label.textContent = 'Mode';
    } else {
      document.documentElement.removeAttribute('data-theme');
      btn.querySelector('.theme-toggle-icon').textContent = 'Dark';
      label.textContent = 'Mode';
    }

    btn.addEventListener('click', () => {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      if (isDark) {
        document.documentElement.removeAttribute('data-theme');
        btn.querySelector('.theme-toggle-icon').textContent = 'Dark';
        label.textContent = 'Mode';
        localStorage.setItem('ci-theme', 'light');
      } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        btn.querySelector('.theme-toggle-icon').textContent = 'Light';
        label.textContent = 'Mode';
        localStorage.setItem('ci-theme', 'dark');
      }
    });
  }

  function initNavigation() {
    const hamburger = $('#nav-hamburger');
    const navLinks = $('#nav-links');

    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });

    navLinks.addEventListener('click', (e) => {
      if (e.target.classList.contains('nav-link')) {
        navLinks.classList.remove('open');
      }
    });

    window.addEventListener('scroll', () => {
      const sections = $$('section[id]');
      let current = '';

      sections.forEach(section => {
        const top = section.offsetTop - 100;
        if (window.scrollY >= top) {
          current = section.getAttribute('id');
        }
      });

      $$('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
          link.classList.add('active');
        }
      });
    });
  }

  function initTabs(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.addEventListener('click', (e) => {
      const btn = e.target.closest('.tab-btn');
      if (!btn) return;

      const tabId = btn.dataset.tab;
      const section = container.closest('.section') || container.parentElement;

      container.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      section.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

      btn.classList.add('active');
      const targetContent = document.getElementById(tabId);
      if (targetContent) targetContent.classList.add('active');
    });
  }

  function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    $$('.fade-in').forEach(el => observer.observe(el));
  }

})();
