import showToast from './components/Toast/Toast';

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
export const verifyError = async err => {
  let description = '';
  switch (err.code) {
    case 'auth/network-request-failed':
      description = 'signin.error.networkError';
      break;
    case 'auth/too-many-requests':
      description = 'total.alert.serverError';
      break;
    case 'auth/popup-blocked':
      description = 'total.alert.serverError';
      break;
    case 'auth/popup-closed-by-user':
      break;
    case undefined:
      break;
    default:
      alert(err.code);
      break;
  }
  description && showToast(description, 2000);
  return;
};

export const dummyProbListCollection = [
  [
    {
      id: "print-stars",
      title: "Print stars",
      corrRate: "46.53"
    },
    {
      id: "find-average",
      title: "Find average",
      corrRate: "28.12"
    },
    {
      id: "dynamic-programming",
      title: "Dynamic Programming",
      corrRate: "36.49"
    },
    {
      id: "input-and-output",
      title: "Input and output",
      corrRate: "50.87"
    },
    {
      id: "network-flow",
      title: "Network flow",
      corrRate: "46.53"
    },{
      id: "print-stars",
      title: "Print stars",
      corrRate: "46.53"
    },
    {
      id: "find-average",
      title: "Find average",
      corrRate: "28.12"
    },
    {
      id: "dynamic-programming",
      title: "Dynamic Programming",
      corrRate: "36.49"
    },
    {
      id: "input-and-output",
      title: "Input and output",
      corrRate: "50.87"
    },
    {
      id: "network-flow",
      title: "Network flow",
      corrRate: "46.53"
    }
  ],
  [
    {
      id: "find-average",
      title: "Find average",
      corrRate: "28.12"
    }
  ],
  [
    {
      id: "print-stars",
      title: "Print stars",
      corrRate: "46.53"
    },
    {
      id: "dynamic-programming",
      title: "Dynamic Programming",
      corrRate: "36.49"
    },
  ]
];
export const probObj404 = {
  description: 
    `404 NOT FOUND`,
  input: 
    `Please check your network connections.`,
  output: 
    `Otherwise, please go back to main page and retry.`,
  examples:
    [],
};
export const defaultSubgoal = [
  {
    id: 1,
    text: '',
  }
];
export const concatSubgoal = (subgoal) => {
  let concatenated = '';
  subgoal.map(s => {
    if (s.text) {
      concatenated += " ";
    }
    concatenated += s.text;
  });
  return concatenated.trim();
}
export const getJsonFromUrl = url => {
  if(!url) url = window.location.search;
  var query = url.substr(1);
  var result = {};
  query.split("&").forEach(function(part) {
    var item = part.split("=");
    result[item[0]] = decodeURIComponent(item[1]);
  });
  return result;
}
export const submitStatus = {
  wip: "WIP",
  done: "DONE"
}