import { useEffect } from 'react'
import { canUseDOM } from 'vtex.render-runtime'

const RegisterPurchase = () => {
  useEffect(() => {
    const controller = new AbortController()
    const { signal } = controller

    if (canUseDOM) {
      const register = localStorage.getItem('@propz-data')

      if (register) {
        try {
          const registerPurchase = async () => {
            const response = await fetch('/_v/post-register-purchase', {
              method: 'POST',
              signal,
              body: register,
            })

            if (response.ok) {
              localStorage.setItem('@propz-data', JSON.stringify({}))
            }
          }

          registerPurchase()
        } catch (error) {
          console.warn(error)
        }
      }
    }

    return () => {
      controller.abort()
    }
  }, [])

  return null
}

export default RegisterPurchase