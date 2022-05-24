import React, { FunctionComponent, useCallback, useEffect, useState } from 'react';
import { Client4 } from 'mattermost-redux/client';
import Styled from './post_file_thumbnail.styled';

interface Props {
  fileId: string;
  extension: string;
  hasPreview: boolean;
}

const PostFileThumbnail: FunctionComponent<Props> = ({ fileId, extension, hasPreview }) => {
  const [fileThumbnail, setFileThumbnail] = useState<string | undefined>();
  const [fileType, setFileType] = useState('ELSE');

  const FileTypes = [
    { AUDIO_TYPES: ['mp3', 'wav', 'wma', 'm4a', 'flac', 'aac', 'ogg'] },
    {
      CODE_TYPES: [
        'as',
        'applescript',
        'osascript',
        'scpt',
        'bash',
        'sh',
        'zsh',
        'clj',
        'boot',
        'cl2',
        'cljc',
        'cljs',
        'cljs.hl',
        'cljscm',
        'cljx',
        'hic',
        'coffee',
        '_coffee',
        'cake',
        'cjsx',
        'cson',
        'iced',
        'cpp',
        'c',
        'cc',
        'h',
        'c++',
        'h++',
        'hpp',
        'cs',
        'csharp',
        'css',
        'd',
        'di',
        'dart',
        'delphi',
        'dpr',
        'dfm',
        'pas',
        'pascal',
        'freepascal',
        'lazarus',
        'lpr',
        'lfm',
        'diff',
        'django',
        'jinja',
        'dockerfile',
        'docker',
        'erl',
        'f90',
        'f95',
        'fsharp',
        'fs',
        'gcode',
        'nc',
        'go',
        'groovy',
        'handlebars',
        'hbs',
        'html.hbs',
        'html.handlebars',
        'hs',
        'hx',
        'java',
        'jsp',
        'js',
        'jsx',
        'json',
        'jl',
        'kt',
        'ktm',
        'kts',
        'less',
        'lisp',
        'lua',
        'mk',
        'mak',
        'md',
        'mkdown',
        'mkd',
        'matlab',
        'm',
        'mm',
        'objc',
        'obj-c',
        'ml',
        'perl',
        'pl',
        'php',
        'php3',
        'php4',
        'php5',
        'php6',
        'ps',
        'ps1',
        'pp',
        'py',
        'gyp',
        'r',
        'ruby',
        'rb',
        'gemspec',
        'podspec',
        'thor',
        'irb',
        'rs',
        'scala',
        'scm',
        'sld',
        'scss',
        'st',
        'sql',
        'swift',
        'tex',
        'vbnet',
        'vb',
        'bas',
        'vbs',
        'v',
        'veo',
        'xml',
        'html',
        'xhtml',
        'rss',
        'atom',
        'xsl',
        'plist',
        'yaml',
      ],
    },
    { IMAGE_TYPES: ['jpg', 'gif', 'bmp', 'png', 'jpeg', 'tiff', 'tif'] },
    { PATCH_TYPES: ['patch'] },
    { PDF_TYPES: ['pdf'] },
    { PRESENTATION_TYPES: ['ppt', 'pptx'] },
    { SPREADSHEET_TYPES: ['xlsx', 'csv'] },
    { TEXT_TYPES: ['txt', 'rtf'] },
    { VIDEO_TYPES: ['mp4', 'avi', 'webm', 'mkv', 'wmv', 'mpg', 'mov', 'flv'] },
    { WORD_TYPES: ['doc', 'docx'] },
  ];

  const getFileThumbnail = useCallback(
    (fileId: string, timeStamp: number) => {
      try {
        const res = Client4.getFileThumbnailUrl(fileId, timeStamp);
        setFileThumbnail(res);
      } catch (err) {
        console.log(err);
      }
    },
    [fileId],
  );

  const getFileType = useCallback(
    (fileId: string, extension: string, timeStamp: number) => {
      for (let i of FileTypes) {
        if (Object.values(i)[0].includes(extension)) {
          const type = Object.keys(i)[0];
          setFileType(type);
          if (type === 'IMAGE_TYPES') {
            if (hasPreview !== true) {
              setFileType('ELSE');
              return;
            }
            getFileThumbnail(fileId, timeStamp);
            return;
          }
        }
      }
    },
    [fileId, extension],
  );

  useEffect(() => {
    getFileType(fileId, extension, 0);
  }, [fileId, extension]);

  return (
    <>
      {fileType === 'IMAGE_TYPES' && <Styled.ImageContainer src={fileThumbnail} />}
      {fileType === 'IMAGE_TYPES_NOTHUMBNAIL' && (
        <svg
          width="32"
          height="40"
          viewBox="0 0 32 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.59518 10.3571L10.4929 1.57645C10.8672 1.20709 11.3718 1 11.8977 1H28C29.6569 1 31 2.34315 31 4V36C31 37.6569 29.6569 39 28 39H4C2.34315 39 1 37.6569 1 36V11.7806C1 11.2456 1.21437 10.7329 1.59518 10.3571Z"
            stroke="#338AFF"
            stroke-width="2"
          />
          <path d="M11 2V11C11 11.5523 10.5523 12 10 12H2" stroke="#338AFF" stroke-width="2" />
          <path
            fillRule="evenodd"
            clip-rule="evenodd"
            d="M21.7791 17.1452C21.2806 16.6467 20.6909 16.3074 20.0147 16.1314C19.3421 15.9563 18.6668 15.9562 17.9942 16.131C17.324 16.2989 16.7342 16.6394 16.2283 17.1452L9.54617 23.8274C8.87 24.5036 8.4115 25.2967 8.17592 26.2028C7.94136 27.105 7.94136 28.0098 8.17592 28.912C8.4115 29.818 8.87 30.6112 9.54617 31.2874C10.2224 31.9636 11.0155 32.4221 11.9216 32.6576C12.8237 32.8922 13.7286 32.8922 14.6307 32.6576C15.5368 32.4221 16.33 31.9636 17.0062 31.2874L22.9282 25.3654C23.1234 25.1701 23.1234 24.8535 22.9282 24.6583L22.2211 23.9511C22.0258 23.7559 21.7092 23.7559 21.514 23.9511L15.5919 29.8732C15.1741 30.291 14.6862 30.5711 14.1234 30.7176C13.5577 30.8648 12.9946 30.8648 12.4289 30.7176C11.8662 30.5711 11.3782 30.291 10.9604 29.8732C10.5425 29.4553 10.2624 28.9674 10.116 28.4047C9.96871 27.8389 9.96871 27.2759 10.116 26.7101C10.2624 26.1474 10.5425 25.6595 10.9604 25.2416L17.6425 18.5595C17.8907 18.3113 18.1736 18.1513 18.4954 18.0726L18.5003 18.0714C18.839 17.983 19.1696 17.9797 19.4969 18.0593C19.8296 18.1465 20.1174 18.3119 20.3649 18.5595C20.613 18.8076 20.7731 19.0905 20.8517 19.4123L20.853 19.4172C20.9408 19.7537 20.9408 20.0875 20.853 20.4241L20.8518 20.429C20.7731 20.7508 20.613 21.0337 20.3649 21.2818L14.3191 27.3276C14.2026 27.4441 14.0692 27.4997 13.8998 27.4997C13.7541 27.4997 13.6273 27.4489 13.506 27.3276C13.3873 27.2089 13.3293 27.0777 13.3214 26.921C13.3292 26.7643 13.3873 26.6331 13.506 26.5144L18.7916 21.2288C18.9869 21.0335 18.9869 20.7169 18.7916 20.5217L18.0845 19.8146C17.8892 19.6193 17.5726 19.6193 17.3774 19.8146L12.0918 25.1002C11.7629 25.4291 11.5382 25.8193 11.4216 26.2662L11.4204 26.2711C11.3146 26.7036 11.3146 27.1384 11.4203 27.5709L11.4216 27.5758C11.5382 28.0227 11.7629 28.4129 12.0918 28.7418C12.42 29.0701 12.8066 29.2916 13.2474 29.3998C13.6877 29.5143 14.1277 29.5195 14.5625 29.4132L14.5674 29.4119C15.0143 29.2954 15.4045 29.0707 15.7334 28.7418L21.7791 22.696C22.285 22.1902 22.6255 21.6004 22.7934 20.9302C22.9682 20.2575 22.968 19.5823 22.793 18.9096C22.617 18.2335 22.2777 17.6438 21.7791 17.1452Z"
            fill="#338AFF"
          />
        </svg>
      )}
      {fileType === 'WORD_TYPES' && (
        <svg
          width="32"
          height="40"
          viewBox="0 0 32 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.59518 10.3571L10.4929 1.57645C10.8672 1.20709 11.3718 1 11.8977 1H28C29.6569 1 31 2.34315 31 4V36C31 37.6569 29.6569 39 28 39H4C2.34315 39 1 37.6569 1 36V11.7806C1 11.2456 1.21437 10.7329 1.59518 10.3571Z"
            stroke="#338AFF"
            stroke-width="2"
          />
          <path d="M11 2V11C11 11.5523 10.5523 12 10 12H2" stroke="#338AFF" stroke-width="2" />
          <path
            d="M20.9939 32H18.1414L16.5172 25.601C16.4606 25.37 16.3764 24.9811 16.2647 24.4341L16.1427 23.821C16.0583 23.3804 16.0081 23.0698 15.9919 22.8892L15.9645 23.1038C15.9303 23.3432 15.8762 23.6565 15.8019 24.044L15.6459 24.8279C15.5737 25.1794 15.5137 25.4534 15.466 25.6501L13.8586 32H11.0141L8 20H10.4646L11.9758 26.5499C12.2397 27.7592 12.431 28.8071 12.5495 29.6936C12.5793 29.4057 12.6447 28.9721 12.7457 28.3927L12.7717 28.2449C12.8875 27.591 12.9966 27.0834 13.099 26.7223L14.8202 20H17.1879L18.9091 26.7223L18.9452 26.8725C19.014 27.1684 19.0962 27.578 19.1919 28.1012L19.2634 28.5005C19.342 28.9511 19.4044 29.3488 19.4505 29.6936L19.4867 29.4248C19.5401 29.0497 19.6143 28.6071 19.7091 28.0971L19.8037 27.6027C19.8856 27.1874 19.9618 26.8365 20.0323 26.5499L21.5354 20H24L20.9939 32Z"
            fill="#338AFF"
          />
        </svg>
      )}
      {fileType === 'AUDIO_TYPES' && (
        <svg
          width="32"
          height="40"
          viewBox="0 0 32 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.59518 10.3571L10.4929 1.57645C10.8672 1.20709 11.3718 1 11.8977 1H28C29.6569 1 31 2.34315 31 4V36C31 37.6569 29.6569 39 28 39H4C2.34315 39 1 37.6569 1 36V11.7806C1 11.2456 1.21437 10.7329 1.59518 10.3571Z"
            stroke="#338AFF"
            stroke-width="2"
          />
          <path d="M11 2V11C11 11.5523 10.5523 12 10 12H2" stroke="#338AFF" stroke-width="2" />
          <path
            d="M9 28.95V23.05C9 23.0224 9.02239 23 9.05 23H13.5L16.9175 20.0707C16.9499 20.0429 17 20.066 17 20.1087V31.8913C17 31.934 16.9499 31.9571 16.9175 31.9293L13.5 29H9.05C9.02239 29 9 28.9776 9 28.95Z"
            stroke="#338AFF"
            stroke-width="2"
          />
          <path
            d="M22.7107 21.3515C22.3872 21.1299 21.9583 21.2328 21.7533 21.5831C21.5484 21.9334 21.6441 22.3965 21.9675 22.6181C23.1165 23.4062 23.8025 24.745 23.8025 26.1999C23.8025 27.6549 23.1165 28.994 21.9675 29.7818C21.6441 30.0034 21.5484 30.4668 21.7533 30.8168C21.9415 31.138 22.3638 31.2865 22.7107 31.0484C24.2632 29.984 25.19 28.1715 25.19 26.1999C25.19 24.2284 24.2632 22.4159 22.7107 21.3515ZM21.092 23.7978C20.7572 23.5999 20.3349 23.7303 20.1493 24.0931C19.9739 24.4378 20.0754 24.8665 20.3738 25.0802L20.4225 25.1121C20.7957 25.3337 21.0275 25.7509 21.0275 26.1999C21.0275 26.6226 20.8221 27.017 20.4871 27.2466L20.4228 27.2877C20.0872 27.4881 19.9649 27.944 20.1496 28.3068C20.3355 28.6712 20.7581 28.8006 21.0922 28.6021C21.9082 28.1162 22.4153 27.1959 22.4153 26.1999C22.4153 25.204 21.9082 24.2834 21.092 23.7978Z"
            fill="#338AFF"
          />
        </svg>
      )}
      {fileType === 'PDF_TYPES' && (
        <svg
          width="32"
          height="40"
          viewBox="0 0 32 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.59518 10.3571L10.4929 1.57645C10.8672 1.20709 11.3718 1 11.8977 1H28C29.6569 1 31 2.34315 31 4V36C31 37.6569 29.6569 39 28 39H4C2.34315 39 1 37.6569 1 36V11.7806C1 11.2456 1.21437 10.7329 1.59518 10.3571Z"
            stroke="#EE4F5C"
            stroke-width="2"
          />
          <path d="M11 2V11C11 11.5523 10.5523 12 10 12H2" stroke="#EE4F5C" stroke-width="2" />
          <path
            fillRule="evenodd"
            clip-rule="evenodd"
            d="M15.4878 16L15.5123 16.0001C16.2287 16.0131 16.8592 16.3652 17.2494 16.9687C17.9458 18.0474 17.8281 19.8849 17.2172 22.1847C17.3043 22.2828 17.3949 22.3787 17.489 22.4723C17.9556 22.9358 18.441 23.3538 18.933 23.721C20.63 23.4697 22.081 23.5831 22.9802 24.1658C23.6244 24.5823 24.0002 25.2422 24.0002 25.9892C24.0002 26.8132 23.5542 27.5091 22.805 27.8166C21.6981 28.2728 20.1011 27.7781 18.3347 26.6764C17.7146 26.8249 17.109 27.0241 16.5567 27.2659C15.9606 27.5271 15.3969 27.7853 14.8716 28.0376C13.5482 30.5492 12.1564 32 10.3567 32C10.075 32 9.79159 31.9601 9.51152 31.88C8.55309 31.6059 8.05649 30.9591 8.00369 30.2141C7.91274 28.8547 9.5044 27.5801 12.7964 25.9402C13.0103 25.4962 13.1918 25.0872 13.5144 24.3424L13.6995 23.9135C13.8503 23.57 14.0054 23.1584 14.153 22.7112C13.0842 20.9253 12.7816 18.9172 13.3628 17.5226C13.75 16.5872 14.5365 16 15.4878 16ZM13.2174 27.6068L12.7509 28.3362C11.8148 29.7998 10.9009 30.5345 9.97437 30.2673L9.92091 30.2507L9.86789 30.2318L9.61256 30.1366L9.75723 29.9056C10.0016 29.5155 10.9189 28.8706 12.3068 28.1039L12.4573 28.0213L13.2174 27.6068ZM16.0392 23.389L15.7855 23.1189L15.6667 23.47L15.5682 23.7522C15.4669 24.0335 15.3574 24.3118 15.2398 24.5868L15.0595 25.0047L14.984 25.1804C14.8851 25.4099 14.7923 25.6219 14.6984 25.8327L14.4593 26.3691L14.9936 26.1254L15.0759 26.0879C15.2966 25.9878 15.5297 25.8841 15.8799 25.7299C16.3776 25.5127 16.9239 25.3204 17.484 25.166L17.908 25.0491L17.5624 24.7771L17.2998 24.5655C16.953 24.2795 16.6196 23.9776 16.3006 23.661C16.2237 23.5838 16.1481 23.5049 16.0392 23.389ZM22.0633 25.5729C22.2394 25.6872 22.3054 25.8086 22.3139 25.993L22.3147 26.0569L22.3128 26.1648L22.2267 26.23C21.929 26.4556 21.1166 26.258 20.1282 25.7671L20.0134 25.7092L19.2833 25.3349L20.1025 25.2895C20.9912 25.2402 21.697 25.3344 22.0633 25.5729ZM15.8343 17.8769C15.7459 17.7411 15.6389 17.6826 15.4904 17.6777L15.4796 17.6776C15.2279 17.6816 15.0428 17.8606 14.9172 18.1635C14.6171 18.8836 14.7438 20.1101 15.2981 21.2851L15.5718 21.8653L15.7157 21.2401C16.0876 19.6238 16.165 18.3878 15.8343 17.8769Z"
            fill="#EE4F5C"
          />
        </svg>
      )}
      {fileType === 'PRESENTATION_TYPES' && (
        <svg
          width="32"
          height="40"
          viewBox="0 0 32 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.59518 10.3571L10.4929 1.57645C10.8672 1.20709 11.3718 1 11.8977 1H28C29.6569 1 31 2.34315 31 4V36C31 37.6569 29.6569 39 28 39H4C2.34315 39 1 37.6569 1 36V11.7806C1 11.2456 1.21437 10.7329 1.59518 10.3571Z"
            stroke="#ED522A"
            stroke-width="2"
          />
          <path d="M11 2V11C11 11.5523 10.5523 12 10 12H2" stroke="#ED522A" stroke-width="2" />
          <path
            fillRule="evenodd"
            clip-rule="evenodd"
            d="M18.8317 25.7059C19.6106 25.0219 20 24.0342 20 22.7428C20 21.5007 19.6343 20.5664 18.903 19.9398C18.1716 19.3133 17.1036 19 15.699 19H12V31H14.4554V26.7319H15.5089C16.9452 26.7319 18.0528 26.3899 18.8317 25.7059ZM15.2634 24.6471H14.4554V21.0848H15.5723C16.2429 21.0848 16.7353 21.2271 17.0495 21.5116C17.3637 21.7962 17.5208 22.2367 17.5208 22.8331C17.5208 23.4241 17.3333 23.8742 16.9584 24.1833C16.5835 24.4925 16.0185 24.6471 15.2634 24.6471Z"
            fill="#ED522A"
          />
        </svg>
      )}
      {fileType === 'TEXT_TYPES' && (
        <svg
          width="32"
          height="40"
          viewBox="0 0 32 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.59518 10.3571L10.4929 1.57645C10.8672 1.20709 11.3718 1 11.8977 1H28C29.6569 1 31 2.34315 31 4V36C31 37.6569 29.6569 39 28 39H4C2.34315 39 1 37.6569 1 36V11.7806C1 11.2456 1.21437 10.7329 1.59518 10.3571Z"
            stroke="#999999"
            stroke-width="2"
          />
          <path d="M11 2V11C11 11.5523 10.5523 12 10 12H2" stroke="#999999" stroke-width="2" />
          <rect x="8.5" y="18.5" width="15" height="1" rx="0.5" stroke="#999999" />
          <rect x="8.5" y="26.5" width="15" height="1" rx="0.5" stroke="#999999" />
          <rect x="8.5" y="22.5" width="15" height="1" rx="0.5" stroke="#999999" />
          <rect x="8.5" y="30.5" width="11" height="1" rx="0.5" stroke="#999999" />
        </svg>
      )}
      {fileType === 'VIDEO_TYPES' && (
        <svg
          width="32"
          height="40"
          viewBox="0 0 32 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.59518 10.3571L10.4929 1.57645C10.8672 1.20709 11.3718 1 11.8977 1H28C29.6569 1 31 2.34315 31 4V36C31 37.6569 29.6569 39 28 39H4C2.34315 39 1 37.6569 1 36V11.7806C1 11.2456 1.21437 10.7329 1.59518 10.3571Z"
            stroke="#338AFF"
            stroke-width="2"
          />
          <path d="M11 2V11C11 11.5523 10.5523 12 10 12H2" stroke="#338AFF" stroke-width="2" />
          <path
            d="M11 31.5955V20.4045C11 20.2187 11.1956 20.0978 11.3618 20.1809L22.5528 25.7764C22.737 25.8685 22.737 26.1315 22.5528 26.2236L11.3618 31.8191C11.1956 31.9022 11 31.7813 11 31.5955Z"
            stroke="#338AFF"
            stroke-width="2"
          />
        </svg>
      )}
      {fileType === 'SPREADSHEET_TYPES' && (
        <svg
          width="32"
          height="40"
          viewBox="0 0 32 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.59518 10.3571L10.4929 1.57645C10.8672 1.20709 11.3718 1 11.8977 1H28C29.6569 1 31 2.34315 31 4V36C31 37.6569 29.6569 39 28 39H4C2.34315 39 1 37.6569 1 36V11.7806C1 11.2456 1.21437 10.7329 1.59518 10.3571Z"
            stroke="#1CA660"
            stroke-width="2"
          />
          <path d="M11 2V11C11 11.5523 10.5523 12 10 12H2" stroke="#1CA660" stroke-width="2" />
          <path
            d="M22 31H18.8902L15.9034 26.461L12.9165 31H10L14.2606 24.8112L10.2723 19H13.2767L16.0439 23.3174L18.7584 19H21.6925L17.6603 24.9508L22 31Z"
            fill="#1CA660"
          />
        </svg>
      )}
      {fileType === 'ELSE' && (
        <svg
          width="32"
          height="40"
          viewBox="0 0 32 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.59518 10.3571L10.4929 1.57645C10.8672 1.20709 11.3718 1 11.8977 1H28C29.6569 1 31 2.34315 31 4V36C31 37.6569 29.6569 39 28 39H4C2.34315 39 1 37.6569 1 36V11.7806C1 11.2456 1.21437 10.7329 1.59518 10.3571Z"
            stroke="#338AFF"
            stroke-width="2"
          />
          <path d="M11 2V11C11 11.5523 10.5523 12 10 12H2" stroke="#338AFF" stroke-width="2" />
          <path
            fillRule="evenodd"
            clip-rule="evenodd"
            d="M21.7791 17.1452C21.2806 16.6467 20.6909 16.3074 20.0147 16.1314C19.3421 15.9563 18.6668 15.9562 17.9942 16.131C17.324 16.2989 16.7342 16.6394 16.2283 17.1452L9.54617 23.8274C8.87 24.5036 8.4115 25.2967 8.17592 26.2028C7.94136 27.105 7.94136 28.0098 8.17592 28.912C8.4115 29.818 8.87 30.6112 9.54617 31.2874C10.2224 31.9636 11.0155 32.4221 11.9216 32.6576C12.8237 32.8922 13.7286 32.8922 14.6307 32.6576C15.5368 32.4221 16.33 31.9636 17.0062 31.2874L22.9282 25.3654C23.1234 25.1701 23.1234 24.8535 22.9282 24.6583L22.2211 23.9511C22.0258 23.7559 21.7092 23.7559 21.514 23.9511L15.5919 29.8732C15.1741 30.291 14.6862 30.5711 14.1234 30.7176C13.5577 30.8648 12.9946 30.8648 12.4289 30.7176C11.8662 30.5711 11.3782 30.291 10.9604 29.8732C10.5425 29.4553 10.2624 28.9674 10.116 28.4047C9.96871 27.8389 9.96871 27.2759 10.116 26.7101C10.2624 26.1474 10.5425 25.6595 10.9604 25.2416L17.6425 18.5595C17.8907 18.3113 18.1736 18.1513 18.4954 18.0726L18.5003 18.0714C18.839 17.983 19.1696 17.9797 19.4969 18.0593C19.8296 18.1465 20.1174 18.3119 20.3649 18.5595C20.613 18.8076 20.7731 19.0905 20.8517 19.4123L20.853 19.4172C20.9408 19.7537 20.9408 20.0875 20.853 20.4241L20.8518 20.429C20.7731 20.7508 20.613 21.0337 20.3649 21.2818L14.3191 27.3276C14.2026 27.4441 14.0692 27.4997 13.8998 27.4997C13.7541 27.4997 13.6273 27.4489 13.506 27.3276C13.3873 27.2089 13.3293 27.0777 13.3214 26.921C13.3292 26.7643 13.3873 26.6331 13.506 26.5144L18.7916 21.2288C18.9869 21.0335 18.9869 20.7169 18.7916 20.5217L18.0845 19.8146C17.8892 19.6193 17.5726 19.6193 17.3774 19.8146L12.0918 25.1002C11.7629 25.4291 11.5382 25.8193 11.4216 26.2662L11.4204 26.2711C11.3146 26.7036 11.3146 27.1384 11.4203 27.5709L11.4216 27.5758C11.5382 28.0227 11.7629 28.4129 12.0918 28.7418C12.42 29.0701 12.8066 29.2916 13.2474 29.3998C13.6877 29.5143 14.1277 29.5195 14.5625 29.4132L14.5674 29.4119C15.0143 29.2954 15.4045 29.0707 15.7334 28.7418L21.7791 22.696C22.285 22.1902 22.6255 21.6004 22.7934 20.9302C22.9682 20.2575 22.968 19.5823 22.793 18.9096C22.617 18.2335 22.2777 17.6438 21.7791 17.1452Z"
            fill="#338AFF"
          />
        </svg>
      )}
    </>
  );
};

export default PostFileThumbnail;
