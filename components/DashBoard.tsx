import { FC, Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { LogoutIcon, ExclamationCircleIcon } from '@heroicons/react/solid'
import { supabase } from '../utils/supabase'
import { Spinner } from './Spinner'
import { UserProfile } from './UserProfile'
import { useQueryClient } from 'react-query'
import useStore from '../store'
import { Notification } from './Notification'

export const DashBoard: FC = () => {
    // supabaseのAPIを使用してログアウトする関数
    const queryClient = useQueryClient()
    const resetProfile = useStore((state) => state.resetEditedProfile)
    const resetNotice = useStore((state) => state.resetEditedNotice)
    const signOut = () => {
        resetProfile()
        supabase.auth.signOut()
        // キャッシュ削除
        queryClient.removeQueries(['profile'])
    }

    return (
        <>
            <LogoutIcon
                className="my-6 h-6 w-6 cursor-pointer text-blue-500"
                onClick={signOut}
            />
            <div className='grid grid-cols-2 gap-4'>
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
                <div className='flex flex-col items-center'>
                    <ErrorBoundary
                        fallback={
                            <ExclamationCircleIcon className='my-5 h-10 w-10 test-pink-500' />
                        }
                    >
                        <Suspense fallback={<Spinner />}>
                            <Notification />
                        </Suspense>
                    </ErrorBoundary>
                </div>
            </div>
        </>
    )
}
