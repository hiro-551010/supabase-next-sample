import type { NextPage } from "next"
import { useEffect } from "react"
import useStore from '../store'
import { supabase } from '../utils/supabase'
import { Layout } from "../components/Layout"
import { Auth } from "../components/Auth"
import { DashBoard } from "../components/DashBoard"
import { useState } from "react"

const Home: NextPage = () => {
    const session = useStore((state) => state.session)
    const setSession = useStore((state) => state.setSession)

    useEffect(() => {
        // supabaseからsession状態を取得
        // const fetchSessionData = async () => {
        //       const sessionResult = await supabase.auth.getSession();
        //       setSessionData(sessionResult.data.session);
        // }
        setSession(supabase.auth.session())

        // ユーザーのログイン状態を監視
        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        })
    }, [setSession])
    return <Layout title="DashBoard">{!session ? <Auth /> : <DashBoard />}</Layout>
}

export default Home

