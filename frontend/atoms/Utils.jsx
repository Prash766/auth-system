import {atom} from 'recoil'

export const resetVerified = atom({
    key:'resetVerifiedAtom',
    default:false
})


export const resetLinkSentData= atom({
    key:'resetlinkdataatom',
    default:null
})


export const isPasswordResetSuccess = atom({
    key: "passwordResetSuccessAtom",
    default: JSON.parse(localStorage.getItem("passwordResetSuccess")) || false,
    effects_UNSTABLE: [
      ({ onSet }) => {
        onSet((newValue) => {
          localStorage.setItem("passwordResetSuccess", JSON.stringify(newValue));
        });
      },
    ],
  });
  