(() => {
  let yOffset = 0; // window.pageYOffset 대신 쓸 변수
  let prevScrollHeight = 0; // 현재 스크롤 위치(yOffset)보다 이전에 위치한 스크롤 섹션들의 스크롤 높이의 합
  let currentScene = 0; // 현재 활성화된 (눈 앞에 보고있는) scroll-section(scene)

  const sceneInfo = [
    {
      // 0
      type: 'sticky',
      heightNum: 5, // 브라우저 높이의 5배로 scrollHeight 세팅
      scrollHeight: 0,
      // 돔 객체 요소들
      objs: {
        container: document.querySelector('#scroll-section-0'),
        messageA: document.querySelector(
          '#scroll-section-0 .main-message.message-a'
        ),
        messageB: document.querySelector(
          '#scroll-section-0 .main-message.message-b'
        ),
        messageC: document.querySelector(
          '#scroll-section-0 .main-message.message-c'
        ),
        messageD: document.querySelector(
          '#scroll-section-0 .main-message.message-d'
        ),
      },
      // 값에 해당하는 것들
      values: {
        messageA_opacity: [0, 1],
      },
    },
    {
      // 1
      type: 'normal',
      heightNum: 5,
      scrollHeight: 0,
      objs: {
        container: document.querySelector('#scroll-section-1'),
      },
    },
    {
      // 2
      type: 'sticky',
      heightNum: 5,
      scrollHeight: 0,
      objs: {
        container: document.querySelector('#scroll-section-2'),
      },
    },
    {
      // 3
      type: 'sticky',
      heightNum: 5,
      scrollHeight: 0,
      objs: {
        container: document.querySelector('#scroll-section-3'),
      },
    },
  ];

  function setLayout() {
    // 각 스크롤 섹션의 높이 세팅
    for (let i = 0; i < sceneInfo.length; i++) {
      sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
      sceneInfo[
        i
      ].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`;
    }

    yOffset = window.pageYOffset;
    let totalScrollHeight = 0;
    for (let i = 0; i < sceneInfo.length; i++) {
      totalScrollHeight += sceneInfo[i].scrollHeight;
      if (totalScrollHeight >= yOffset) {
        currentScene = i;
        break;
      }
    }
    document.body.setAttribute('id', `show-scene-${currentScene}`);
  }

  function calcValues(values, currentYOffset) {}

  function playAnimation() {
    const objs = sceneInfo[currentScene].objs;
    const values = sceneInfo[currentScene].values;
    const currentYOffset = yOffset - prevScrollHeight;

    console.log(currentScene, currentYOffset);
    switch (currentScene) {
      case 0:
        let messageA_opacity_0 = values.messageA_opacity[0];
        let messageA_opacity_1 = values.messageA_opacity[1];
        console.log(calcValues(values.messageA_opacity, currentYOffset));
        break;
      case 1:
        break;
      case 2:
        break;
      case 3:
        break;
    }
  }

  function scrollLoop() {
    prevScrollHeight = 0;
    for (let i = 0; i < currentScene; i++) {
      // prevScrollHeight = prevScrollHeight + sceneInfo[i.scrollHeight];
      prevScrollHeight += sceneInfo[i].scrollHeight;
    }

    if (yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight) {
      currentScene++;
      document.body.setAttribute('id', `show-scene-${currentScene}`);
    }

    if (yOffset < prevScrollHeight) {
      if (currentScene === 0) return; // 브라우저 바운스 효과로 인해 마이너스가 되는 것을 방지 (모바일 ios)
      currentScene--;
      document.body.setAttribute('id', `show-scene-${currentScene}`);
    }
    playAnimation();
  }

  window.addEventListener('scroll', () => {
    yOffset = window.pageYOffset;
    scrollLoop();
  });
  // 돔 html 객체들만 로딩되어도 실행됨
  // window.addEventListener('DomContentLoaded', setLayout);
  // 이미지들 등 리소스들까지 다 로딩되고나서 실행됨
  window.addEventListener('load', setLayout);
  window.addEventListener('resize', setLayout);
})();
