/**
 * 將 JSON Web Token 存儲在本地存儲 
 * @param paramToken 
 */
export const SET_TOKEN = (paramToken: string) => {
    localStorage.setItem('jwtToken', paramToken)
}

/**
 * 從本地存儲中讀取 JSON Web Token
 * @returns 
 */
export const GET_TOKEN = () => {
    return localStorage.getItem('jwtToken')
}