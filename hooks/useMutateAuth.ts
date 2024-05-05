import { useState } from 'react'
import { useMutation } from 'react-query'
import { supabase } from '../utils/supabase'

export const useMutateAuth = () => {
    // emailとpasswordの初期値
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    // ユーザーが書いたそれらをリセットする関数
    const reset = () => {
        setEmail('')
        setPassword('')
    }

    // サインインする際に使用する関数 新しい方だとこっち
    // const loginMutation = useMutation(
    //     async () => {
    //         const { error } = await supabase.auth.signInWithPassword({ email, password })
    //         if (error) throw new Error(error.message)
    //     },
    //     {
    //         onError: (err: any) => {
    //             alert(err.message)
    //             reset()
    //         },
    //     }
    // )

    // 古い方
    const loginMutation = useMutation(
        async () => {
            const { error } = await supabase.auth.signIn({ email, password })
        }
    )

    // サインアップする際に使用する関数
    const registerMutation = useMutation(
        async () => {
            const { error } = await supabase.auth.signUp({ email, password })
            if (error) throw new Error(error.message)
        },
        {
            onError: (err: any) => {
                alert(err.message)
                reset()
            },
        }
    )

    return {
        email,
        setEmail,
        password,
        setPassword,
        loginMutation,
        registerMutation,
    }
}
