import Head from 'next/head'
import Link from 'next/link'

// 按需引入 antd
import {Carousel} from 'antd';  // for js
// 测试 sass
import '../scss/test.scss';
import '../scss/test1.css';

// import {Carousel } from 'antd'
class Index extends React.Component {

    render() {
        return <div>
            <Head>
                <title>next.js and antd</title>
                <link rel="stylesheet" href="/_next/static/styles/index.css"/>
            </Head>
            <Link href="/other">To other</Link>
            <div className="fullSlide">
                <Carousel ref="carousel">
                    <div key={1} className={'slide-block'}>1</div>
                    <div key={2} className={'slide-block'}>2</div>
                    <div key={3} className={'slide-block'}>3</div>
                </Carousel>
                <i className="bg-ico"></i>

            </div>
        </div>

    }
}

export default Index