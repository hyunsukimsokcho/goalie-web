export const getBrowserLanguageCode = () => {
  return navigator.language.substr(0, 2);
};

export const metaTagContents = {
  title: {
    ko: 'Goalie, 코드 디자인으로부터 배우는 프로그래밍',
    en: 'Design your program with Goalie!',
  },
  description: {
    ko:
      '직접 코드를 디자인하고, 프로그래머들과 공유하세요. 코드 설계, 디자인 피드백 모두 goalie에서는 모두 쉽습니다.',
    en:
      'Design code on your own, then share with others. Designing code, getting feedback are easy in goalie',
  },
  keywords: {
    ko: '코드디자인, 프로그래밍교육, 코딩교육, 에듀테크, 교육앱',
    en: '코드디자인, 프로그래밍교육, 코딩교육, 에듀테크, 교육앱',
  },
  site_name: {
    ko: '문제별 코드 디자인 공유 플랫폼 골리',
    en: 'Goalie, code design sharing platform',
  },
};