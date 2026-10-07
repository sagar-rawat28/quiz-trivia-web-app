// ===== Quiz Trivia - Full Featured (Lives, Bonuses, Stats, Achievements) =====
const App = (() => {
  let state = {
    selectedCategory: null,
    selectedCategoryId: null,
    difficulty: 'easy',
    questionCount: 20,
    questions: [],
    currentIndex: 0,
    score: 0,          // points (correct*10 + bonuses)
    correctCount: 0,
    answers: [],
    timer: null,
    timeLeft: 15,
    timePerQuestion: 15,
    startTime: 0,
    totalTimeTaken: 0,
    isLoading: false,
    usingFallback: false,
    currentStreak: 0,
    bestStreak: 0,
    hintUsed: false,
    soundEnabled: true,
    theme: 'dark',
    lives: 3,
    maxLives: 3,
    skipsLeft: 99,
    mode: 'exam', // 'exam' | 'practice'
    flagged: {}, // { questionIndex: true }
    bonusPoints: 0,
    isPaused: false,
    pausedTimeLeft: 0
  };

  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => document.querySelectorAll(sel);

  const screens = {
    home: $('#homeScreen'),
    quiz: $('#quizScreen'),
    results: $('#resultsScreen'),
    review: $('#reviewScreen'),
    leaderboard: $('#leaderboardScreen'),
    stats: $('#statsScreen')
  };

  const els = {
    categoriesGrid: $('#categoriesGrid'),
    startBtn: $('#startBtn'),
    quizCategory: $('#quizCategory'),
    quizScore: $('#quizScore'),
    quizStreak: $('#quizStreak'),
    livesDisplay: $('#livesDisplay'),
    timer: $('#timer'),
    timerValue: $('#timerValue'),
    progressBar: $('#progressBar'),
    questionCard: $('#questionCard'),
    questionNumber: $('#questionNumber'),
    questionText: $('#questionText'),
    optionsList: $('#optionsList'),
    nextBtn: $('#nextBtn'),
    quitBtn: $('#quitBtn'),
    pauseBtn: $('#pauseBtn'),
    hintBtn: $('#hintBtn'),
    skipBtn: $('#skipBtn'),
    resumeBtn: $('#resumeBtn'),
    pauseOverlay: $('#pauseOverlay'),
    finalScore: $('#finalScore'),
    scoreCircle: $('#scoreCircle'),
    resultsTitle: $('#resultsTitle'),
    resultsSubtitle: $('#resultsSubtitle'),
    achievementsBox: $('#achievementsBox'),
    statCorrect: $('#statCorrect'),
    statWrong: $('#statWrong'),
    statStreak: $('#statStreak'),
    statBonus: $('#statBonus'),
    statTime: $('#statTime'),
    reviewBtn: $('#reviewBtn'),
    playAgainBtn: $('#playAgainBtn'),
    shareBtn: $('#shareBtn'),
    homeFromResultsBtn: $('#homeFromResultsBtn'),
    saveScoreBox: $('#saveScoreBox'),
    playerName: $('#playerName'),
    saveScoreBtn: $('#saveScoreBtn'),
    reviewList: $('#reviewList'),
    backToResultsBtn: $('#backToResultsBtn'),
    homeFromReviewBtn: $('#homeFromReviewBtn'),
    leaderboardList: $('#leaderboardList'),
    clearLeaderboardBtn: $('#clearLeaderboardBtn'),
    homeFromLbBtn: $('#homeFromLbBtn'),
    leaderboardBtn: $('#leaderboardBtn'),
    statsBtn: $('#statsBtn'),
    statsDashboard: $('#statsDashboard'),
    resetStatsBtn: $('#resetStatsBtn'),
    homeFromStatsBtn: $('#homeFromStatsBtn'),
    homeBtn: $('#homeBtn'),
    soundBtn: $('#soundBtn'),
    themeBtn: $('#themeBtn'),
    loadingOverlay: $('#loadingOverlay'),
    loadingText: $('#loadingText'),
    apiBadge: $('#apiBadge'),
    confettiCanvas: $('#confettiCanvas'),
    overviewBtn: $('#overviewBtn'),
    overviewOverlay: $('#overviewOverlay'),
    overviewGrid: $('#overviewGrid'),
    closeOverviewBtn: $('#closeOverviewBtn'),
    closeOverviewBtn2: $('#closeOverviewBtn2'),
    flagBtn: $('#flagBtn')
  };

  const categories = [
    { name: 'Random Mix', id: 0, icon: '🎲' },
    { name: 'General Knowledge', id: 9, icon: '🌍' },
    { name: 'Science', id: 17, icon: '🔬' },
    { name: 'Technology', id: 18, icon: '💻' },
    { name: 'History', id: 23, icon: '📜' },
    { name: 'Sports', id: 21, icon: '⚽' },
    { name: 'Movies', id: 11, icon: '🎬' },
    { name: 'TV Shows', id: 14, icon: '📺' },
    { name: 'Music', id: 12, icon: '🎵' },
    { name: 'Geography', id: 22, icon: '🗺️' },
    { name: 'Animals', id: 27, icon: '🐾' },
    { name: 'Mythology', id: 20, icon: '⚡' },
    { name: 'Vehicles', id: 28, icon: '🚗' }
  ];

  const difficultyTime = { easy: 15, medium: 12, hard: 8 };

  // ===== Audio =====
  let audioCtx = null;
  function getAudio() {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    return audioCtx;
  }
  function playTone(freq, duration, type = 'sine', volume = 0.08) {
    if (!state.soundEnabled) return;
    try {
      const ctx = getAudio();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.value = freq;
      gain.gain.value = volume;
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
      osc.stop(ctx.currentTime + duration);
    } catch (e) {}
  }
  function playCorrect() {
    playTone(523, 0.1); setTimeout(() => playTone(659, 0.12), 90); setTimeout(() => playTone(784, 0.15), 180);
  }
  function playWrong() { playTone(200, 0.25, 'sawtooth', 0.06); }
  function playClick() { playTone(600, 0.04, 'square', 0.04); }
  function playTick() { playTone(800, 0.03, 'sine', 0.03); }
  function playFinish() {
    [523, 659, 784, 1046].forEach((f, i) => setTimeout(() => playTone(f, 0.18), i * 120));
  }
  function playLifeLost() { playTone(150, 0.3, 'triangle', 0.07); }

  // ===== Confetti =====
  function launchConfetti() {
    const canvas = els.confettiCanvas;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const pieces = [];
    const colors = ['#6366f1', '#a855f7', '#22c55e', '#f59e0b', '#ef4444', '#3b82f6'];
    for (let i = 0; i < 130; i++) {
      pieces.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        w: 6 + Math.random() * 6,
        h: 8 + Math.random() * 8,
        color: colors[Math.floor(Math.random() * colors.length)],
        speed: 2 + Math.random() * 4,
        rot: Math.random() * 360,
        rotSpeed: -4 + Math.random() * 8
      });
    }
    let frame = 0;
    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pieces.forEach(p => {
        p.y += p.speed;
        p.rot += p.rotSpeed;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rot * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      });
      frame++;
      if (frame < 160) requestAnimationFrame(draw);
      else ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    draw();
  }

  // ===== Theme & Sound =====
  function applyTheme(theme) {
    state.theme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    els.themeBtn.textContent = theme === 'dark' ? '🌙' : '☀️';
    localStorage.setItem('quizTriviaTheme', theme);
  }
  function toggleTheme() {
    applyTheme(state.theme === 'dark' ? 'light' : 'dark');
    playClick();
  }
  function toggleSound() {
    state.soundEnabled = !state.soundEnabled;
    els.soundBtn.textContent = state.soundEnabled ? '🔊' : '🔇';
    localStorage.setItem('quizTriviaSound', state.soundEnabled ? '1' : '0');
    if (state.soundEnabled) playClick();
  }

  // ===== Stats (localStorage) =====
  function getStats() {
    try {
      return JSON.parse(localStorage.getItem('quizTriviaStats') || '{}');
    } catch { return {}; }
  }
  function saveStats(update) {
    const s = getStats();
    const next = { ...s, ...update };
    localStorage.setItem('quizTriviaStats', JSON.stringify(next));
  }
  function updateStatsAfterGame(percentage, correct, total) {
    const s = getStats();
    const games = (s.games || 0) + 1;
    const totalCorrect = (s.totalCorrect || 0) + correct;
    const totalAnswered = (s.totalAnswered || 0) + total;
    const best = Math.max(s.bestPercentage || 0, percentage);
    const bestStreak = Math.max(s.bestStreakEver || 0, state.bestStreak);
    saveStats({
      games,
      totalCorrect,
      totalAnswered,
      bestPercentage: best,
      bestStreakEver: bestStreak,
      lastPlayed: new Date().toISOString()
    });
  }

  function renderStats() {
    const s = getStats();
    const accuracy = s.totalAnswered ? Math.round((s.totalCorrect / s.totalAnswered) * 100) : 0;
    els.statsDashboard.innerHTML = `
      <div class="stat-card"><div class="value">${s.games || 0}</div><div class="label">Games Played</div></div>
      <div class="stat-card"><div class="value">${accuracy}%</div><div class="label">Accuracy</div></div>
      <div class="stat-card"><div class="value">${s.bestPercentage || 0}%</div><div class="label">Best Score</div></div>
      <div class="stat-card"><div class="value">${s.bestStreakEver || 0}</div><div class="label">Best Streak</div></div>
      <div class="stat-card"><div class="value">${s.totalCorrect || 0}</div><div class="label">Total Correct</div></div>
      <div class="stat-card"><div class="value">${s.totalAnswered || 0}</div><div class="label">Questions Answered</div></div>
    `;
  }

  // ===== Init =====
  function init() {
    const savedTheme = localStorage.getItem('quizTriviaTheme') || 'dark';
    applyTheme(savedTheme);
    if (localStorage.getItem('quizTriviaSound') === '0') {
      state.soundEnabled = false;
      els.soundBtn.textContent = '🔇';
    }
    renderCategories();
    bindEvents();
  }

  function renderCategories() {
    els.categoriesGrid.innerHTML = categories.map(cat => `
      <div class="category-card" data-category="${cat.name}" data-id="${cat.id}">
        <span class="category-icon">${cat.icon}</span>
        <div class="category-name">${cat.name}</div>
        <div class="category-count">${cat.id === 0 ? 'Mixed categories' : 'Live questions'}</div>
      </div>
    `).join('');
  }

  function bindEvents() {
    els.categoriesGrid.addEventListener('click', (e) => {
      const card = e.target.closest('.category-card');
      if (!card) return;
      $$('.category-card').forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      state.selectedCategory = card.dataset.category;
      state.selectedCategoryId = parseInt(card.dataset.id);
      els.startBtn.disabled = false;
      els.startBtn.textContent = `Start ${state.selectedCategory} Quiz →`;
      playClick();
    });

    $$('.mode-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        $$('.mode-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        state.mode = btn.dataset.mode;
        playClick();
      });
    });

    $$('.diff-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        $$('.diff-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        state.difficulty = btn.dataset.diff;
        state.timePerQuestion = difficultyTime[state.difficulty];
        playClick();
      });
    });

    $$('.count-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        $$('.count-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        state.questionCount = parseInt(btn.dataset.count);
        playClick();
      });
    });

    els.startBtn.addEventListener('click', startQuiz);
    els.nextBtn.addEventListener('click', nextQuestion);
    els.hintBtn.addEventListener('click', useHint);
    els.skipBtn.addEventListener('click', skipQuestion);
    els.pauseBtn.addEventListener('click', pauseQuiz);
    els.resumeBtn.addEventListener('click', resumeQuiz);
    if (els.overviewBtn) els.overviewBtn.addEventListener('click', openOverview);
    if (els.closeOverviewBtn) els.closeOverviewBtn.addEventListener('click', closeOverview);
    if (els.closeOverviewBtn2) els.closeOverviewBtn2.addEventListener('click', closeOverview);
    if (els.flagBtn) els.flagBtn.addEventListener('click', toggleFlag);

    els.quitBtn.addEventListener('click', () => {
      if (confirm('Quit this quiz? Progress will be lost.')) {
        clearInterval(state.timer);
        state.isPaused = false;
        els.pauseOverlay.classList.add('hidden');
        showScreen('home');
        resetQuiz();
      }
    });

    els.reviewBtn.addEventListener('click', showReview);
    els.playAgainBtn.addEventListener('click', () => {
      if (state.selectedCategory) startQuiz();
      else showScreen('home');
    });
    els.shareBtn.addEventListener('click', shareResult);
    els.homeFromResultsBtn.addEventListener('click', () => showScreen('home'));

    els.saveScoreBtn.addEventListener('click', saveScore);
    els.playerName.addEventListener('keypress', (e) => { if (e.key === 'Enter') saveScore(); });

    els.backToResultsBtn.addEventListener('click', () => showScreen('results'));
    els.homeFromReviewBtn.addEventListener('click', () => showScreen('home'));

    els.leaderboardBtn.addEventListener('click', () => {
      renderLeaderboard();
      showScreen('leaderboard');
    });
    els.homeFromLbBtn.addEventListener('click', () => showScreen('home'));
    els.clearLeaderboardBtn.addEventListener('click', () => {
      if (confirm('Clear all leaderboard scores?')) {
        localStorage.removeItem('quizTriviaLeaderboard');
        renderLeaderboard();
      }
    });

    els.statsBtn.addEventListener('click', () => {
      renderStats();
      showScreen('stats');
    });
    els.homeFromStatsBtn.addEventListener('click', () => showScreen('home'));
    els.resetStatsBtn.addEventListener('click', () => {
      if (confirm('Reset all your local stats?')) {
        localStorage.removeItem('quizTriviaStats');
        renderStats();
      }
    });

    els.homeBtn.addEventListener('click', () => {
      clearInterval(state.timer);
      state.isPaused = false;
      els.pauseOverlay.classList.add('hidden');
      showScreen('home');
      resetQuiz();
    });

    els.themeBtn.addEventListener('click', toggleTheme);
    els.soundBtn.addEventListener('click', toggleSound);

    // Keyboard
    document.addEventListener('keydown', (e) => {
      if (state.isPaused) {
        if (e.key === 'p' || e.key === 'P' || e.key === 'Escape') resumeQuiz();
        return;
      }
      if (screens.quiz.classList.contains('hidden')) return;
      if (e.key >= '1' && e.key <= '4') {
        const idx = parseInt(e.key) - 1;
        const btns = $$('.option-btn:not(:disabled):not(.hidden-by-hint)');
        if (btns[idx]) btns[idx].click();
      }
      if (e.key === 'Enter' && !els.nextBtn.disabled) nextQuestion();
      if (e.key.toLowerCase() === 'h' && !els.hintBtn.disabled) useHint();
      if (e.key.toLowerCase() === 'p') pauseQuiz();
      if (e.key.toLowerCase() === 's' && !els.skipBtn.disabled) skipQuestion();
      if (e.key.toLowerCase() === 'm') openOverview();
      if (e.key.toLowerCase() === 'f') toggleFlag();
    });
  }

  function showScreen(name) {
    Object.values(screens).forEach(s => s && s.classList.add('hidden'));
    if (screens[name]) screens[name].classList.remove('hidden');
    if (name === 'home') {
      els.homeBtn.style.display = 'none';
      els.leaderboardBtn.style.display = 'flex';
      els.statsBtn.style.display = 'flex';
    } else {
      els.homeBtn.style.display = 'flex';
      els.leaderboardBtn.style.display = name === 'leaderboard' ? 'none' : 'flex';
      els.statsBtn.style.display = name === 'stats' ? 'none' : 'flex';
    }
  }

  function showLoading(show, text = 'Fetching fresh questions...') {
    els.loadingOverlay.classList.toggle('hidden', !show);
    if (els.loadingText) els.loadingText.textContent = text;
    state.isLoading = show;
  }

  function decodeHtml(html) {
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
  }

  function updateLivesDisplay() {
    const hearts = '❤️'.repeat(state.lives) + '🖤'.repeat(state.maxLives - state.lives);
    els.livesDisplay.textContent = hearts || '💀';
  }

  async function fetchQuestionsFromAPI() {
    let url;
    if (state.selectedCategoryId === 0) {
      // Random Mix - no category filter
      url = `https://opentdb.com/api.php?amount=${state.questionCount}&difficulty=${state.difficulty}&type=multiple`;
    } else {
      url = `https://opentdb.com/api.php?amount=${state.questionCount}&category=${state.selectedCategoryId}&difficulty=${state.difficulty}&type=multiple`;
    }
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network error');
    const data = await response.json();
    if (data.response_code !== 0 || !data.results?.length) {
      throw new Error('No questions available for this combination.');
    }
    return data.results.map(q => {
      const incorrect = q.incorrect_answers.map(a => decodeHtml(a));
      const correct = decodeHtml(q.correct_answer);
      const options = shuffleArray([...incorrect, correct]);
      return {
        question: decodeHtml(q.question),
        options,
        correct: options.indexOf(correct)
      };
    });
  }

  function getFallbackQuestions() {
    if (typeof quizData === 'undefined') return null;
    const key = Object.keys(quizData)[Math.floor(Math.random() * Object.keys(quizData).length)];
    const pool = [...quizData[key]];
    shuffleArray(pool);
    return pool.slice(0, Math.min(state.questionCount, pool.length));
  }

  async function startQuiz() {
    if (!state.selectedCategory || state.isLoading) return;

    state.currentIndex = 0;
    state.score = 0;
    state.correctCount = 0;
    state.answers = [];
    state.totalTimeTaken = 0;
    state.currentStreak = 0;
    state.bestStreak = 0;
    state.hintUsed = false;
    state.lives = state.maxLives;
    state.skipsLeft = 99;
    state.flagged = {};
    state.bonusPoints = 0;
    state.isPaused = false;
    state.timePerQuestion = difficultyTime[state.difficulty];
    state.usingFallback = false;

    els.quizCategory.textContent = state.selectedCategory;
    els.quizScore.textContent = '0';
    els.quizStreak.textContent = '0';
    updateLivesDisplay();
    els.nextBtn.disabled = true;
    els.nextBtn.textContent = 'Next →';
    els.hintBtn.disabled = false;
    els.hintBtn.textContent = '💡 50/50';
    els.skipBtn.disabled = false;
    els.skipBtn.textContent = '⏭ Skip';
    els.pauseOverlay.classList.add('hidden');

    showLoading(true, 'Fetching fresh questions...');
    els.startBtn.disabled = true;

    try {
      state.questions = await fetchQuestionsFromAPI();
      state.usingFallback = false;
      els.apiBadge.textContent = 'Live API';
      els.apiBadge.className = 'api-badge live';
    } catch (err) {
      console.warn(err.message);
      const fallback = getFallbackQuestions();
      if (fallback?.length) {
        state.questions = fallback;
        state.usingFallback = true;
        els.apiBadge.textContent = 'Offline';
        els.apiBadge.className = 'api-badge offline';
        showLoading(true, 'Using offline questions...');
        await new Promise(r => setTimeout(r, 400));
      } else {
        showLoading(false);
        els.startBtn.disabled = false;
        alert('Could not load questions. Check internet or try another category.');
        return;
      }
    }

    showLoading(false);
    els.startBtn.disabled = false;
    showScreen('quiz');
    loadQuestion();
  }

  function loadQuestion() {
    clearInterval(state.timer);
    state.hintUsed = false;
    els.hintBtn.disabled = false;
    els.hintBtn.textContent = '💡 50/50';
    updateFlagButton();

    const q = state.questions[state.currentIndex];
    const total = state.questions.length;

    els.questionCard.classList.remove('slide-in');
    els.questionCard.classList.add('slide-out');

    setTimeout(() => {
      els.questionNumber.textContent = `Question ${state.currentIndex + 1} of ${total}`;
      els.questionText.textContent = q.question;
      els.progressBar.style.width = `${(state.currentIndex / total) * 100}%`;

      const letters = ['A', 'B', 'C', 'D'];
      els.optionsList.innerHTML = q.options.map((opt, i) => `
        <button class="option-btn" data-index="${i}">
          <span class="option-letter">${letters[i]}</span>
          <span>${opt}</span>
        </button>
      `).join('');

      $$('.option-btn').forEach(btn => {
        btn.addEventListener('click', () => selectOption(parseInt(btn.dataset.index)));
      });

      els.questionCard.classList.remove('slide-out');
      els.questionCard.classList.add('slide-in');
    }, 160);

    state.timeLeft = state.timePerQuestion;
    state.startTime = Date.now();
    updateTimerDisplay();
    els.timer.classList.remove('warning', 'danger');
    els.nextBtn.disabled = true;

    state.timer = setInterval(() => {
      if (state.isPaused) return;
      state.timeLeft--;
      updateTimerDisplay();
      if (state.timeLeft <= 5 && state.timeLeft > 0) playTick();
      if (state.timeLeft <= 5 && state.timeLeft > 2) {
        els.timer.classList.add('warning');
        els.timer.classList.remove('danger');
      } else if (state.timeLeft <= 2) {
        els.timer.classList.remove('warning');
        els.timer.classList.add('danger');
      }
      if (state.timeLeft <= 0) {
        clearInterval(state.timer);
        handleTimeout();
      }
    }, 1000);
  }

  function updateTimerDisplay() {
    els.timerValue.textContent = state.timeLeft;
  }

  function pauseQuiz() {
    if (state.isPaused || els.nextBtn.disabled === false) return;
    state.isPaused = true;
    state.pausedTimeLeft = state.timeLeft;
    clearInterval(state.timer);
    els.pauseOverlay.classList.remove('hidden');
    playClick();
  }

  function resumeQuiz() {
    if (!state.isPaused) return;
    state.isPaused = false;
    state.timeLeft = state.pausedTimeLeft;
    els.pauseOverlay.classList.add('hidden');
    updateTimerDisplay();
    playClick();

    state.timer = setInterval(() => {
      if (state.isPaused) return;
      state.timeLeft--;
      updateTimerDisplay();
      if (state.timeLeft <= 5 && state.timeLeft > 0) playTick();
      if (state.timeLeft <= 5 && state.timeLeft > 2) {
        els.timer.classList.add('warning');
        els.timer.classList.remove('danger');
      } else if (state.timeLeft <= 2) {
        els.timer.classList.remove('warning');
        els.timer.classList.add('danger');
      }
      if (state.timeLeft <= 0) {
        clearInterval(state.timer);
        handleTimeout();
      }
    }, 1000);
  }

  function useHint() {
    if (state.hintUsed || els.nextBtn.disabled === false || state.isPaused) return;
    state.hintUsed = true;
    els.hintBtn.disabled = true;
    els.hintBtn.textContent = 'Used';
    playClick();
    const q = state.questions[state.currentIndex];
    const wrong = q.options.map((_, i) => i).filter(i => i !== q.correct);
    shuffleArray(wrong);
    const toHide = wrong.slice(0, 2);
    $$('.option-btn').forEach((btn, i) => {
      if (toHide.includes(i)) btn.classList.add('hidden-by-hint');
    });
  }

  function skipQuestion() {
    if (els.nextBtn.disabled === false || state.isPaused) return;
    // Unlimited skips in exam mode
    playClick();

    clearInterval(state.timer);
    const q = state.questions[state.currentIndex];
    state.totalTimeTaken += Math.round((Date.now() - state.startTime) / 1000);
    state.currentStreak = 0;

    state.answers.push({
      questionIndex: state.currentIndex,
      selected: -2, // skipped
      correct: q.correct,
      isCorrect: false,
      timeTaken: 0,
      skipped: true
    });

    // Exam mode: no correct answer shown on skip
    $$('.option-btn').forEach(btn => {
      btn.disabled = true;
    });

    els.quizStreak.textContent = '0';
    els.nextBtn.disabled = false;
    els.hintBtn.disabled = true;
    if (state.currentIndex === state.questions.length - 1) {
      els.nextBtn.textContent = 'See Results →';
    }
  }

  function loseLife() {
    state.lives--;
    updateLivesDisplay();
    playLifeLost();
    if (state.lives <= 0) {
      // Game over early
      setTimeout(() => showResults(true), 800);
      return true;
    }
    return false;
  }

  function selectOption(index) {
    // Exam mode: no correct/incorrect feedback until the end
    if ($$('.option-btn.selected').length > 0 || state.isPaused) return;

    clearInterval(state.timer);
    const q = state.questions[state.currentIndex];
    const timeTaken = Math.round((Date.now() - state.startTime) / 1000);
    state.totalTimeTaken += timeTaken;

    const isCorrect = index === q.correct;
    let gained = 0;

    if (isCorrect) {
      state.correctCount++;
      gained = 10;
      if (timeTaken <= 5) {
        gained += 5;
        state.bonusPoints += 5;
      }
      state.currentStreak++;
      if (state.currentStreak > state.bestStreak) state.bestStreak = state.currentStreak;
      if (state.currentStreak >= 3) {
        gained += 3;
        state.bonusPoints += 3;
      }
      state.score += gained;
    } else {
      state.currentStreak = 0;
      const gameOver = loseLife();
      if (gameOver) {
        state.answers.push({
          questionIndex: state.currentIndex,
          selected: index,
          correct: q.correct,
          isCorrect: false,
          timeTaken
        });
        $$('.option-btn').forEach((btn, i) => {
          btn.disabled = true;
          if (state.mode === 'practice') {
            if (i === q.correct) btn.classList.add('correct');
            if (i === index) btn.classList.add('incorrect', 'selected');
          } else if (i === index) {
            btn.classList.add('selected');
          }
        });
        return;
      }
    }

    // Replace previous answer for this question if user changes it
    const existingIdx = state.answers.findIndex(a => a.questionIndex === state.currentIndex);
    const answerObj = {
      questionIndex: state.currentIndex,
      selected: index,
      correct: q.correct,
      isCorrect,
      timeTaken,
      points: gained
    };
    if (existingIdx >= 0) {
      // Adjust score if changing answer
      const old = state.answers[existingIdx];
      if (old.isCorrect && !isCorrect) {
        state.correctCount = Math.max(0, state.correctCount - 1);
        state.score = Math.max(0, state.score - (old.points || 10));
      } else if (!old.isCorrect && isCorrect) {
        state.correctCount++;
        state.score += gained;
      }
      state.answers[existingIdx] = answerObj;
    } else {
      state.answers.push(answerObj);
    }

    // Visual feedback depends on mode
    $$('.option-btn').forEach((btn, i) => {
      btn.disabled = true;
      if (state.mode === 'practice') {
        if (i === q.correct) btn.classList.add('correct');
        if (i === index && !isCorrect) btn.classList.add('incorrect');
      }
      if (i === index) btn.classList.add('selected');
    });

    if (state.mode === 'practice') {
      if (isCorrect) playCorrect();
      else playWrong();
    } else {
      playClick();
    }

    els.quizScore.textContent = state.score;
    els.quizStreak.textContent = state.currentStreak;
    els.nextBtn.disabled = false;
    els.hintBtn.disabled = true;

    if (state.currentIndex === state.questions.length - 1) {
      els.nextBtn.textContent = 'See Results →';
    }
  }

  function handleTimeout() {
    // Exam mode: no reveal of correct answer on timeout
    const q = state.questions[state.currentIndex];
    state.totalTimeTaken += state.timePerQuestion;
    state.currentStreak = 0;
    playClick();

    state.answers.push({
      questionIndex: state.currentIndex,
      selected: -1,
      correct: q.correct,
      isCorrect: false,
      timeTaken: state.timePerQuestion
    });

    $$('.option-btn').forEach((btn, i) => {
      btn.disabled = true;
      if (state.mode === 'practice' && i === q.correct) btn.classList.add('correct');
    });

    els.quizStreak.textContent = '0';
    els.nextBtn.disabled = false;
    els.hintBtn.disabled = true;

    const gameOver = loseLife();
    if (gameOver) return;

    if (state.currentIndex === state.questions.length - 1) {
      els.nextBtn.textContent = 'See Results →';
    }
  }

  function nextQuestion() {
    if (state.currentIndex < state.questions.length - 1) {
      state.currentIndex++;
      loadQuestion();
    } else {
      showResults(false);
    }
  }

  function showResults(gameOverByLives = false) {
    clearInterval(state.timer);
    state.isPaused = false;
    els.pauseOverlay.classList.add('hidden');

    const total = state.questions.length;
    const correct = state.correctCount;
    const wrong = total - correct;
    const percentage = total > 0 ? Math.round((correct / total) * 100) : 0;
    const avgTime = total > 0 ? Math.round(state.totalTimeTaken / total) : 0;

    // Show points-based score or percentage
    els.finalScore.textContent = `${percentage}%`;
    els.scoreCircle.style.setProperty('--score-deg', `${percentage * 3.6}deg`);
    els.resultsSubtitle.textContent = gameOverByLives
      ? `Out of lives! ${correct}/${total} correct • ${state.score} pts`
      : `You scored ${correct} out of ${total} • ${state.score} pts`;

    els.statCorrect.textContent = correct;
    els.statWrong.textContent = wrong;
    els.statStreak.textContent = state.bestStreak;
    els.statBonus.textContent = state.bonusPoints;
    els.statTime.textContent = `${avgTime}s`;

    if (gameOverByLives) els.resultsTitle.textContent = 'Out of Lives! 💀';
    else if (percentage >= 90) els.resultsTitle.textContent = 'Outstanding! 🏆';
    else if (percentage >= 70) els.resultsTitle.textContent = 'Great Job! 🎉';
    else if (percentage >= 50) els.resultsTitle.textContent = 'Good Effort! 👍';
    else els.resultsTitle.textContent = 'Keep Practicing! 💪';

    // Achievements
    const badges = [];
    if (percentage === 100) badges.push({ text: '🏆 Perfect Score', cls: 'gold' });
    if (state.bestStreak >= 5) badges.push({ text: '🔥 Streak Master', cls: 'purple' });
    if (state.bonusPoints >= 15) badges.push({ text: '⚡ Speed Demon', cls: 'blue' });
    if (state.lives === state.maxLives && !gameOverByLives) badges.push({ text: '🛡️ Flawless', cls: 'green' });
    if (correct >= 1 && gameOverByLives === false && state.lives > 0) badges.push({ text: '💪 Survivor', cls: 'green' });
    if (percentage >= 80) badges.push({ text: '🌟 High Scorer', cls: 'gold' });

    if (badges.length) {
      els.achievementsBox.classList.remove('hidden');
      els.achievementsBox.innerHTML = badges.map(b =>
        `<span class="achievement-badge ${b.cls}">${b.text}</span>`
      ).join('');
    } else {
      els.achievementsBox.classList.add('hidden');
      els.achievementsBox.innerHTML = '';
    }

    els.playerName.value = '';
    els.saveScoreBox.style.display = 'block';
    els.saveScoreBtn.disabled = false;
    els.saveScoreBtn.textContent = 'Save';

    updateStatsAfterGame(percentage, correct, total);
    showScreen('results');
    playFinish();
    if (percentage >= 80) setTimeout(launchConfetti, 300);
  }

  function shareResult() {
    const total = state.questions.length;
    const percentage = Math.round((state.correctCount / total) * 100);
    const text = `🧠 QuizTrivia Result\n${state.selectedCategory} (${state.difficulty})\nScore: ${state.correctCount}/${total} (${percentage}%) • ${state.score} pts\nBest Streak: ${state.bestStreak} 🔥 • Bonus: ${state.bonusPoints}\nCan you beat me?`;
    if (navigator.share) {
      navigator.share({ title: 'QuizTrivia', text }).catch(() => copyText(text));
    } else {
      copyText(text);
    }
  }

  function copyText(text) {
    navigator.clipboard.writeText(text).then(() => {
      els.shareBtn.textContent = 'Copied!';
      setTimeout(() => { els.shareBtn.textContent = '📤 Share'; }, 2000);
    }).catch(() => alert(text));
  }

  function showReview() {
    els.reviewList.innerHTML = state.questions.map((q, i) => {
      const ans = state.answers[i];
      if (!ans) return '';
      const isCorrect = ans.isCorrect;
      let yourAnswer = '—';
      if (ans.skipped) yourAnswer = 'Skipped';
      else if (ans.selected === -1) yourAnswer = 'Timeout';
      else if (ans.selected >= 0) yourAnswer = q.options[ans.selected];
      const correctAnswer = q.options[ans.correct];
      return `
        <div class="review-item ${isCorrect ? 'correct' : 'incorrect'}">
          <div class="review-q">${i + 1}. ${q.question}</div>
          ${!isCorrect ? `<div class="review-answer your">Your answer: <span>${yourAnswer}</span></div>` : ''}
          <div class="review-answer correct-ans">Correct: <span>${correctAnswer}</span></div>
        </div>
      `;
    }).join('');
    showScreen('review');
  }

  function getLeaderboard() {
    try { return JSON.parse(localStorage.getItem('quizTriviaLeaderboard') || '[]'); }
    catch { return []; }
  }

  function saveScore() {
    const name = els.playerName.value.trim();
    if (!name) { els.playerName.focus(); return; }
    const total = state.questions.length;
    const percentage = Math.round((state.correctCount / total) * 100);
    const entry = {
      name: name.slice(0, 20),
      score: state.score,
      correct: state.correctCount,
      total,
      percentage,
      category: state.selectedCategory,
      difficulty: state.difficulty,
      bestStreak: state.bestStreak,
      date: new Date().toISOString()
    };
    const board = getLeaderboard();
    board.push(entry);
    board.sort((a, b) => b.percentage - a.percentage || b.score - a.score);
    localStorage.setItem('quizTriviaLeaderboard', JSON.stringify(board.slice(0, 50)));
    els.saveScoreBtn.textContent = 'Saved ✓';
    els.saveScoreBtn.disabled = true;
  }

  function renderLeaderboard() {
    const board = getLeaderboard();
    if (!board.length) {
      els.leaderboardList.innerHTML = `<div class="empty-state"><div class="icon">🏆</div><p>No scores yet. Play and save your score!</p></div>`;
      return;
    }
    els.leaderboardList.innerHTML = board.slice(0, 15).map((entry, i) => {
      const date = new Date(entry.date).toLocaleDateString();
      return `
        <li class="lb-item">
          <div class="lb-rank">${i + 1}</div>
          <div class="lb-info">
            <div class="lb-name">${escapeHtml(entry.name)}</div>
            <div class="lb-meta">${entry.category} • ${entry.difficulty} • ${date}</div>
          </div>
          <div class="lb-score">${entry.percentage}%</div>
        </li>
      `;
    }).join('');
  }

  function toggleFlag() {
    if (screens.quiz.classList.contains('hidden')) return;
    const i = state.currentIndex;
    if (state.flagged[i]) {
      delete state.flagged[i];
    } else {
      state.flagged[i] = true;
    }
    updateFlagButton();
    playClick();
  }

  function updateFlagButton() {
    if (!els.flagBtn) return;
    const flagged = !!state.flagged[state.currentIndex];
    els.flagBtn.textContent = flagged ? '🚩 Flagged' : '🚩 Flag';
    els.flagBtn.classList.toggle('flagged', flagged);
  }

  function openOverview() {
    if (screens.quiz.classList.contains('hidden') || state.isPaused) return;
    renderOverview();
    els.overviewOverlay.classList.remove('hidden');
    playClick();
  }

  function closeOverview() {
    els.overviewOverlay.classList.add('hidden');
    playClick();
  }

  function renderOverview() {
    const total = state.questions.length;
    const status = {};
    state.answers.forEach(a => {
      if (a.skipped || a.selected === -1) status[a.questionIndex] = 'skipped';
      else status[a.questionIndex] = 'answered';
    });

    els.overviewGrid.innerHTML = '';
    for (let i = 0; i < total; i++) {
      let st = 'unanswered';
      let label = 'Open';
      if (i === state.currentIndex) { st = 'current'; label = 'Current'; }
      else if (status[i] === 'answered') { st = 'answered'; label = 'Done'; }
      else if (status[i] === 'skipped') { st = 'skipped'; label = 'Skipped'; }

      if (state.flagged[i] && st !== 'current') {
        st = 'flagged';
        label = status[i] === 'answered' ? 'Flagged ✓' : 'Flagged';
      }

      const qText = state.questions[i]?.question || ('Question ' + (i + 1));
      const btn = document.createElement('button');
      btn.className = 'q-map-item ' + st;
      btn.innerHTML = `
        <span class="q-map-num">${i + 1}</span>
        <span class="q-map-text">${qText}</span>
        <span class="q-map-status">${label}</span>
      `;
      btn.addEventListener('click', () => jumpToQuestion(i));
      els.overviewGrid.appendChild(btn);
    }
  }

  function jumpToQuestion(index) {
    if (index < 0 || index >= state.questions.length) return;
    clearInterval(state.timer);
    state.currentIndex = index;
    closeOverview();
    loadQuestion();
    // If this question was already answered, restore the selected option visually
    const prev = state.answers.find(a => a.questionIndex === index);
    if (prev && prev.selected >= 0) {
      // wait a tick for options to render
      setTimeout(() => {
        $$('.option-btn').forEach((btn, i) => {
          btn.disabled = true;
          if (i === prev.selected) btn.classList.add('selected');
        });
        els.nextBtn.disabled = false;
        els.hintBtn.disabled = true;
        if (state.currentIndex === state.questions.length - 1) {
          els.nextBtn.textContent = 'See Results →';
        } else {
          els.nextBtn.textContent = 'Next →';
        }
      }, 220);
    }
  }

  function resetQuiz() {
    clearInterval(state.timer);
    state.currentIndex = 0;
    state.score = 0;
    state.correctCount = 0;
    state.answers = [];
    state.questions = [];
    state.currentStreak = 0;
    state.isPaused = false;
    state.flagged = {};
    if (els.overviewOverlay) els.overviewOverlay.classList.add('hidden');
    els.nextBtn.disabled = true;
  }

  function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  init();
  return { state };
})();
