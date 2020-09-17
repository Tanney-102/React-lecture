const path = require('path');

module.exports = {
    name: 'word-relay-setting', // webpack setting에 대한 이름
    mode: 'development', // 실서비스시 production
    devtool: 'eval',
    resolve: {
        extensions: ['.js', '.jsx'] //확장자를 추가(entry)
    },

    entry: {
        app: ['./client'], // client.jsx 가 WordRelay, react, react-dom을 불러오기 때문에 추가할 필요 없음, resolve에 추가했으므로 확장자를 넣을 필요 없음
    }, // 입력

    module: {
        rules: [{
            test: /\.jsx?/, // 적용대상 : js와 jsx파일에 적용 ,,,,,, 정규표현식 공부하기
            loader: 'babel-loader', // 적용할 rule: babel-loader
            options: {
                presets: [
                    ['@babel/preset-env', { // preset의 설정을 추가
                        targets: {
                            browsers: ['> 5% in KR'], // 지원하는 브라우저만 적어주기, browserslist에서 찾아보기
                            // '> 5% in KR' 한국에서 점유율이 5%이상인 브라우저!!
                        },
                        debug: true,
                    }], 
                    '@babel/preset-react'
                ],
                // presets => 플러그인들의 모임
                plugins: [
                    '@babel/plugin-proposal-class-properties',
                    'react-hot-loader/babel',
                ],
            }, // babel의 옵션
        }],
    }, // entry를 읽어 module을 적용한 뒤 outputs으로 뺀다.

    output: {
        path: path.join(__dirname, 'dist'), //dist directory의 경로
        filename: 'app.js',
        publicPath: '/dist/',
    }, // 출력
};


/* webpack 빌드하기
 => webpack 명령어를 통해? 
1. package.json -> script에 "dev":"webpack"을 추가
    => terminal에 npm run dev를 치면 webpack 이 실행됨

2. npx webpack


 */