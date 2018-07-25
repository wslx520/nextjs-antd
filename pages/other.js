import Head from 'next/head'
import Link from 'next/link'
import {Affix} from 'antd'
import {Button} from 'antd'
const Other = (props) => (
    <div>
        <Head>
            <title>Other Page</title>
        </Head>
        <Affix>
            <div>
                <Link href='/'><Button>Go main</Button></Link>
            </div>
        </Affix>

    </div>
)

export default Other