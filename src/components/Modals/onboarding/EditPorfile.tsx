import React, { useState, type SetStateAction } from "react";
import { BiLock, BiRightArrow } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";
import { useUser } from "../../../context/UserContext";

export default function EditProfile() {

    const { user, editProfile ,setEditProfile} = useUser()
    if (!editProfile) return

    const [about, setAbout] = useState("");
    const maxChars = 250;
    const [editNameModal,setEditNameModal] = useState<boolean>(false)


    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20" onClick={() => setEditProfile(false)}>
            <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center justify-between mb-6">
                    <h2 className=" text-xl font-semibold text-gray-900"> Edit Profile </h2>
                    <button onClick={() => setEditProfile(false)} className="text-2xl cursor-pointer"><RxCross2 /></button>
                </div>

                {/* Profile Images */}
                <div className="mb-4 flex items-center justify-center gap-4">
                    {/* <div className="relative">
            <div className="h-20 w-20 rounded-full bg-gray-200" />
            <span className="absolute -top-1 -left-1 rounded-full bg-black px-2 py-0.5 text-xs text-white">
              Main
            </span>
            <button className="absolute bottom-0 right-0 flex h-6 w-6 items-center justify-center rounded-full bg-white shadow">
              ✎
            </button>
          </div> */}

                    <button className="flex h-20 w-20 items-center justify-center rounded-xl border border-dashed border-gray-300 text-3xl text-gray-400 hover:bg-gray-50">
                        +
                    </button>
                </div>

                {/* Helper Text */}
                <p className="mb-4 text-xs text-gray-500">
                    Please do not share inappropriate content or personal information
                    (such as phone number or address). All uploads are reviewed.
                </p>


                <div className="mb-4">
                    <label className="mb-1 block text-sm font-medium text-gray-800">
                        Name
                    </label>
                    <div onClick={() => setEditNameModal(true)} className="flex items-center cursor-pointer justify-between bg-gray-100 p-3 rounded-xl border border-gray-400/30">
                        <div className="flex items-center gap-2">
                            <BiLock />
                            <p className="font-semibold text-gray-700 ">{user.name}</p>
                        </div>
                        <button><BiRightArrow /></button>
                    </div>

                </div>

                {/* About Me */}
                <div className="mb-4">
                    <label className="mb-1 block text-sm font-medium text-gray-800">
                        About me
                    </label>
                    <textarea
                        value={about}
                        onChange={(e) => setAbout(e.target.value.slice(0, maxChars))}
                        placeholder="Share a little something about yourself."
                        className="h-24 w-full resize-none rounded-lg border border-gray-300 p-3 text-sm focus:border-black focus:outline-none"
                    />
                    <div className="mt-1 text-right text-xs text-gray-400">
                        {about.length}/{maxChars}
                    </div>
                </div>


                {/* Footer */}
                <button
                    // onClick={onSubmit}
                    className="w-full rounded-full bg-primary py-3 font-semibold text-white transition hover:bg-emerald-500"
                >
                    Save
                </button>
            </div>
            <EditName editNameModal={editNameModal} setEditNameModal={setEditNameModal}/>
        </div>
    );
}


function EditName({editNameModal, setEditNameModal} : {editNameModal : boolean, setEditNameModal : React.Dispatch<SetStateAction<boolean>>}) {
//   const [name, setName] = useState(initialName);
  const maxLength = 20;

  if (!editNameModal) return null;
  const {user} = useUser()

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/30" onClick={(e) => {
        e.stopPropagation()
        setEditNameModal(false)}
    }>
      <div className="relative w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="mb-5 flex items-center justify-between gap-2">
          <h2 className="text-lg font-semibold text-gray-900">
            Edit name
          </h2>
          <button
            onClick={() => setEditNameModal(false)}
            className="flex h-8 w-8 text-xl items-center justify-center rounded-full cursor-pointer"
            aria-label="Back"
          >
          <RxCross2 />
          </button>
        </div>

        {/* Input */}
        <div className="mb-2">
          <input
            defaultValue={user?.name}
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 focus:border-black focus:outline-none"
          />
          <div className="mt-1 text-right text-xs text-gray-400">
            {/* {name.length}/{maxLength} */}
          </div>
        </div>

        {/* Info Text */}
        <p className="mb-6 text-xs text-gray-500 leading-relaxed">
          To change name, please download mobile app and
          subscribe to Snack plus.
        </p>

        {/* Save Button (Disabled State) */}
        <button
          disabled
          className="w-full cursor-not-allowed rounded-full bg-gray-200 py-3 text-sm font-semibold text-gray-400"
        >
          Save
        </button>
      </div>
    </div>
  );
}
