import { useQueryClient, useMutation } from "react-query";
import { supabase } from "../utils/supabase";
import { Profile } from "../types";

export const useMutateProfile = () => {
    const queryClient = useQueryClient()
    const createProfileMutation = useMutation(
        // updated_at,created_atは自動で生成されるため除外
        async (profile: Omit<Profile, 'updated_at' | 'created_at'>) => {
            // .from(挿入したいテーブル),やりたい動作(レコードになるデータ)
            const { data, error } = await supabase.from('profiles').insert(profile)
            if (error) throw new Error(error.message)
            return data
        },
        {
            // 返り値がそれぞれの引数に入れられる
            onSuccess: (res) => {
                // キャッシュに登録
                queryClient.setQueryData(['profile'], res[0])
            },
            onError: (err: any) => {
                alert(err.message)
            },
        }
    )

    const updateProfileMutation = useMutation(
        async (profile: Omit<Profile, 'created_at' | 'updated_at'>) => {
            const { data, error } =
                await supabase.from('profiles').update(profile).eq('id', profile.id)
            if (error) throw new Error(error.message)
            return data
        },
        {
            onSuccess: (res) => {
                queryClient.setQueryData(['profile'], res[0])
            },
            onError: (err: any) => {
                alert(err.message)
            },
        }
    )
    return { createProfileMutation, updateProfileMutation }
}