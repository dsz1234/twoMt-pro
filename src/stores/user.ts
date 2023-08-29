import type { User } from '@/types/user'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore(
  'cp-user',
  () => {
    // token
    const user = ref<User>()
    // 保存token，登录后使用
    const setUser = (u: User) => {
      user.value = u
    }
    //清空
    const delUser = () => {
      user.value = undefined
    }
    return { user, setUser, delUser }
  },
  {
    persist: true
  }
)
