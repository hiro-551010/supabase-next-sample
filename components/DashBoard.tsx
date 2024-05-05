import { FC, Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { LogoutIcon, ExclamationCircleIcon } from '@heroicons/react/solid'
import { supabase } from '../utils/supabase'
import { Spinner } from './Spinner'
import { UserProfile } from './UserProfile'

export const DashBoard: FC = () => {
    // supabaseのAPIを使用してログアウトする関数
    const signOut = () => {
        supabase.auth.signOut()
    }

    return (
        <>
            <LogoutIcon
                className="my-6 h-6 w-6 cursor-pointer text-blue-500"
                onClick={signOut}
            />
            <div className='flex flex-col items-center'>
                <ErrorBoundary
                    fallback={
                        <ExclamationCircleIcon className='my-5 h-10 w-10 test-pink-500' />
                    }
                >
                    <Suspense fallback={<Spinner />}>
                        <UserProfile />
                    </Suspense>
                </ErrorBoundary>
            </div>
        </>
    )
}
