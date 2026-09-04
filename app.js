const langButtons = document.querySelectorAll('.lang-button');
const translatedNodes = document.querySelectorAll('[data-es][data-zh]');
const creatorTabs = [...document.querySelectorAll('.creator-tab')];
const creatorLabel = document.querySelector('#creator-label');
const creatorTitle = document.querySelector('#creator-title');
const creatorHook = document.querySelector('#creator-hook');
const creatorShots = document.querySelector('#creator-shots');
const creatorMessage = document.querySelector('#creator-message');

let currentLanguage = 'es';
let currentCreator = 'tech';

const creatorIdeas = {
  tech: {
    es: { label: 'TECH / GADGETS', title: '3 detalles que hacen más práctica esta power bank', hook: '“Ya incluye USB-C y Lightning, pero eso no es lo único.”', shots: ['Empieza con la pantalla circular.', 'Saca los cables USB-C y Lightning.', 'Conecta un teléfono y muestra el icono de carga.', 'Cierra con el acabado y los puertos.'], message: '10,000mAh, hasta 22.5W, dos cables integrados y pantalla digital 0–100%.' },
    zh: { label: '数码 / 好物测评', title: '三个细节，让这台移动电源更实用', hook: '“它已经内置 USB-C 和 Lightning，但亮点不止这些。”', shots: ['先拍圆形电量屏。', '取出 USB-C 和 Lightning 内置线。', '连接手机并拍到充电标识。', '最后展示外观质感和接口。'], message: '10,000mAh、最高 22.5W、两根内置线和 0–100% 电量屏。' }
  },
  work: {
    es: { label: 'TRABAJO / OFICINA', title: 'Lo que llevo para no quedarme sin batería durante el trabajo', hook: '“Mi celular es parte de mi trabajo, así que esto siempre va en mi bolsa.”', shots: ['Muestra el teléfono con poca batería.', 'Saca la PB03 de una bolsa de trabajo.', 'Conecta el cable integrado correcto.', 'Termina en un escritorio limpio.'], message: 'Una power bank compacta, sobria y lista para acompañarte durante la jornada.' },
    zh: { label: '职场 / 办公 / 效率', title: '工作中不掉电，我会在包里准备这个', hook: '“手机就是我的工作工具，所以这个一直放在包里。”', shots: ['拍摄工作中的手机低电量。', '从通勤包或电脑包取出 PB03。', '使用匹配的内置线连接。', '在简洁办公桌面结束。'], message: '外观低调、方便携带，适合陪伴一整天的工作。' }
  },
  travel: {
    es: { label: 'VIAJES / EQUIPAJE', title: 'Viajo con menos cables', hook: '“Dos cables menos en mi equipaje gracias a esta power bank.”', shots: ['Prepara una mochila o equipaje de mano.', 'Muestra los dos cables que normalmente llevarías.', 'Sustitúyelos visualmente por la PB03.', 'Revisa la pantalla y guárdala junto al teléfono.'], message: 'USB-C y Lightning integrados en una power bank de 10,000mAh.' },
    zh: { label: '旅行 / 极简收纳', title: '旅行时，让包里少带两根线', hook: '“因为这台移动电源，我的行李里可以少装两根线。”', shots: ['准备背包或随身行李。', '展示原本需要携带的两根线。', '用 PB03 取代散装线材。', '查看电量后与手机一起放入包中。'], message: 'USB-C 与 Lightning 内置于一台 10,000mAh 移动电源。' }
  },
  couple: {
    es: { label: 'IPHONE + ANDROID', title: 'Dos teléfonos diferentes, una sola power bank', hook: '“Él usa Android, yo uso iPhone… y los dos podemos usar la misma power bank.”', shots: ['Pon un iPhone y un Android en el mismo plano.', 'Acércate a los conectores USB-C y Lightning.', 'Conecta cada cable a su teléfono.', 'Muestra ambos estados de carga y la pantalla.'], message: 'Dos cables integrados para los dispositivos que usamos todos los días.' },
    zh: { label: '情侣 / 双机用户', title: '两种手机，一台移动电源', hook: '“他用 Android，我用 iPhone，但我们可以共用这一台。”', shots: ['让 iPhone 和 Android 同时出镜。', '特写 USB-C 与 Lightning 接头。', '分别连接两台手机。', '拍到充电状态和圆形电量屏。'], message: '两根内置线，覆盖日常使用的 iPhone 与 Android 设备。' }
  }
};

function renderCreator() {
  const idea = creatorIdeas[currentCreator][currentLanguage];
  creatorLabel.textContent = idea.label;
  creatorTitle.textContent = idea.title;
  creatorHook.textContent = idea.hook;
  creatorMessage.textContent = idea.message;
  creatorShots.innerHTML = idea.shots.map((shot) => `<li>${shot}</li>`).join('');
}

function setLanguage(language) {
  currentLanguage = language;
  document.documentElement.lang = language === 'zh' ? 'zh-CN' : 'es';
  translatedNodes.forEach((node) => {
    node.innerHTML = node.dataset[language];
  });
  langButtons.forEach((button) => {
    button.classList.toggle('active', button.dataset.lang === language);
    button.setAttribute('aria-pressed', String(button.dataset.lang === language));
  });
  renderCreator();
}

langButtons.forEach((button) => {
  button.addEventListener('click', () => setLanguage(button.dataset.lang));
});

creatorTabs.forEach((tab, index) => {
  tab.addEventListener('click', () => {
    currentCreator = tab.dataset.creator;
    creatorTabs.forEach((item) => {
      const active = item === tab;
      item.classList.toggle('active', active);
      item.setAttribute('aria-selected', String(active));
      item.tabIndex = active ? 0 : -1;
    });
    renderCreator();
  });
  tab.addEventListener('keydown', (event) => {
    if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(event.key)) return;
    event.preventDefault();
    const step = ['ArrowRight', 'ArrowDown'].includes(event.key) ? 1 : -1;
    const next = creatorTabs[(index + step + creatorTabs.length) % creatorTabs.length];
    next.focus();
    next.click();
  });
});

setLanguage('es');
