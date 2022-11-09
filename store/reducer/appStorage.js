import { FORCEUSERIN, COINS, LOGIN, CHANGE_WALLET, MODIFY_WATCHLIST, PAYMENT_METHOD, BUY_ASSET, CONVERT_ASSET, SELL_ASSET, TOPUP, TEMPORAL, CLEANTEMPORAL, READNOTIFICATION, ADD_ID, LOGOUT, UPDATEUSER } from "../action/appStorage";

const initialState = {
    token: "",
    expiresIn: "",
    user: {},
    notifications: [],
    temporalObj: {}
}


export const userAuthReducer = (state = initialState, action) => {
    switch (action.type) {
        case FORCEUSERIN:
            if (action.payload) {
                return {
                    ...state,
                    token: action.payload.token,
                    expiresIn: action.payload.expiresIn,
                    user: action.payload.user,
                    notifications:action.payload.notification,
                }
            }
            break;
        case LOGIN:
            if (action.payload) {
                return {
                    ...state,
                    token: action.payload.token,
                    expiresIn: action.payload.expiresIn,
                    user: action.payload.user,
                    notifications: action.payload.notification
                }
            }
            break;

        case COINS:
            if (action.payload) {
                return {
                    ...state,
                    coins: [...action.payload]
                }
            }
            break;
        case CHANGE_WALLET:
            if (action.payload) {
                return {
                    ...state,
                    user: action.payload
                }
            }
            break;
        case MODIFY_WATCHLIST:
            if (action.payload) {
                return {
                    ...state,
                    user: action.payload
                }
            }
            break;

        case PAYMENT_METHOD:
            if (action.payload) {
                return {
                    ...state,
                    user: action.payload
                }
            }
            break;


        case BUY_ASSET:
            if (action.payload) {
                return {
                    ...state,
                    user: action.payload

                }
            }
        case CONVERT_ASSET:
            if (action.payload) {
                return {
                    ...state,
                    user: action.payload

                }

            }
        case SELL_ASSET:
            if (action.payload) {
                return {
                    ...state,
                    user: action.payload

                }

            }
        case TOPUP:
            if (action.payload) {
                return {
                    ...state,
                    user: action.payload
    
                }
            }
            

        case TEMPORAL:
            if (action.payload) {
                return {
                    ...state,
                    temporalObj: action.payload

                }


            }
        case CLEANTEMPORAL:
            if (action.type) {
                let temporalObject = state.temporalObj
                return {
                    ...state,
                    token: temporalObject.token,
                    expiresIn: temporalObject.expiresIn,
                    user: temporalObject.user,
                    notifications: temporalObject.user.notifications
                }

            }
        case READNOTIFICATION:
            if (action.payload) {
                return {
                    ...state,
                    user: action.payload.user,
                    notifications: action.payload.notification
                }
            }
            break;

        case ADD_ID:
            if (action.payload) {
                return {
                    ...state,
                    user: action.payload,
                }
            }
            break;

        case LOGOUT:
            return {
                ...state,
                token: null
            }
            break;
        case UPDATEUSER:
            if (action.payload) {
                return {
                    ...state,
                    user: action.payload,
                }
            }
            break;

        default:
            return state
    }

}
