import '../styles/globals.scss'
import Layout from "../components/layout/layout";
import {AuthProvider} from "../store/AuthContext";

export default function App({Component, pageProps}) {
    return (
        <AuthProvider>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </AuthProvider>
    )
}
