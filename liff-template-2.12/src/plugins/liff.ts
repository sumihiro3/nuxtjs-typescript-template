import { LiffContextData, LIFFErrorObject } from 'liff-type'
import { Profile } from '@line/bot-sdk'
import { LiffError } from '@/types'

export function initLiff(pageLiffId: string): Promise<boolean> {
  return new Promise(resolve => {
    window.liff
      .init({ liffId: pageLiffId })
      .then(() => {
        console.log('LIFF initialized!')
        // const payload = window.liff.getDecodedIDToken()
        // console.log(payload)
        resolve(true)
      })
      .catch(err => {
        console.warn('LIFF initialization failed', err)
        resolve(false)
      })
  })
}

export function getLineProfile(): Promise<Profile> {
  return new Promise(resolve => {
    window.liff
      .getProfile()
      .then((profile: Profile) => {
        console.log('liff.getProfile success!')
        resolve(profile)
      })
      .catch((err: LIFFErrorObject) => {
        console.warn('liff.getProfile failed', err)
        throw new LiffError(err.code, err.message)
      })
  })
}

export function getOS(): string {
  return window.liff.getOS()
}

export function getLiffLanguage(): string {
  return window.liff.getLanguage()
}

export function getLiffVersion(): string {
  return window.liff.getVersion()
}

export function isInClient(): boolean {
  return window.liff.isInClient()
}

export function isLineLoggedIn(): boolean {
  return window.liff.isLoggedIn()
}

// export function isLiffApiAvailable(apiName: string): boolean {
//   return window.liff.isApiAvailable(apiName)
// }

export function getLiffAccessToken(): string {
  return window.liff.getAccessToken()
}

export function getLiffContext(): LiffContextData {
  return window.liff.getContext()
}

export function liffLogin(redirectUri?: string) {
  return window.liff.login({
    redirectUri
  })
}