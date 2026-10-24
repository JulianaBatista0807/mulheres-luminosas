const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.nav-links');

menuButton?.addEventListener('click', () => {
  const isOpen = navigation.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
});

navigation?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navigation.classList.remove('open');
    menuButton?.setAttribute('aria-expanded', 'false');
  });
});

const practicePrompts = {
  pare: 'Faça uma pausa. Respire com calma e dê a si mesma alguns segundos.',
  perceba: 'O que você está sentindo? Onde essa emoção aparece no seu corpo? O que está precisando agora?',
  escolha: 'Qual é um pequeno passo possível para você neste momento?',
};

const practicePrompt = document.querySelector('#practice-prompt');
const practiceTabs = document.querySelectorAll('[data-step]');

practiceTabs.forEach((button) => {
  button.addEventListener('click', () => {
    practiceTabs.forEach((tab) => tab.setAttribute('aria-selected', 'false'));
    button.setAttribute('aria-selected', 'true');
    practicePrompt.textContent = practicePrompts[button.dataset.step];
  });
});

document.querySelectorAll('.faq details').forEach((item) => {
  item.addEventListener('toggle', () => {
    if (!item.open) return;

    document.querySelectorAll('.faq details').forEach((otherItem) => {
      if (otherItem !== item) otherItem.open = false;
    });
  });
});

const weekDays = document.querySelectorAll('.week-list .day');

function highlightToday() {
  const today = new Date().getDay();

  weekDays.forEach((day) => {
    const isToday = Number(day.dataset.day) === today;
    day.classList.toggle('is-today', isToday);
    day.open = isToday;
    day.querySelector('.today-badge')?.remove();

    if (isToday) {
      day.querySelector('.day-title').insertAdjacentHTML('beforeend', ' <span class="today-badge">Hoje</span>');
    }
  });

  // Atualiza novamente à meia-noite, caso a página fique aberta
  const midnight = new Date();
  midnight.setHours(24, 0, 0, 0);
  setTimeout(highlightToday, midnight - new Date());
}

if (weekDays.length) highlightToday();
