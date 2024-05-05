import { useState, FormEvent, FC } from 'react'
import { ShieldCheckIcon } from '@heroicons/react/solid'
import { useMutateAuth } from '../hooks/useMutateAuth'

export const Auth: FC = () => {
    const [isLogin, setIsLogin] = useState(true)
    const {
        email,
        setEmail,
        password,
        setPassword,
        loginMutation,
        registerMutation,
    } = useMutateAuth()

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (isLogin) {
            loginMutation.mutate()
        } else {
            registerMutation.mutate()
        }
    }

    return (
        <>
            {/* 認証画面 */}
            <ShieldCheckIcon className="mb-8 h-12 w-12 test-blue-500" />
            <form onSubmit={handleSubmit}>
                {/* email入力フォーム */}
                <div>
                    <input
                        type="text"
                        required
                        className="my-2 rounded border border-gray-300 px-3 py-2 test-sm focus:outline-none"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value)
                        }}
                    />
                </div>
                {/* password入力フォーム */}
                <div>
                    <input
                        type="text"
                        required
                        className="my-2 rounded border border-gray-300 px-3 py-2 test-sm focus:outline-none"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value)
                        }}
                    />
                </div>
                {/* ログイン状態を管理する？ */}
                <div className="my-6 flex items-center justify-center text-sm">
                    <span
                        onClick={() => setIsLogin(!isLogin)}
                        className="cursor-pointer font-medium hover:text-indigo-500"
                    >
                        change mode ?
                    </span>
                </div>
                {/* submitボタン */}
                <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-indigo-600 py-2 px-4 text-sm test-white"
                >
                    {isLogin ? 'Login' : 'Register'}
                </button>
            </form>
        </>
    )
}
