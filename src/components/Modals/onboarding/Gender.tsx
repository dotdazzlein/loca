import { useState } from 'react'
import api from '../../../lib/api';
import { useUser } from '../../../context/UserContext';
import Spinner from '../../Loading/Spinner';

const Gender = ({ onNext }: { onNext: () => void }) => {

    const { user, setUser } = useUser()
    const [selectedGender, setSelectedGender] = useState<string | null>(null)
    const genders = ['Male', 'Female', 'Others']
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("")



    const handleSave = async () => {
        validator()
        try {
            setLoading(true)
            const res = await api.patch("/user/profile", { gender: selectedGender });
            setUser(res.data.user)
            onNext();
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    };

    const validator = () => {

    }

    return (
        <div className='py-5 h-full flex flex-col justify-between'>
            <div>
                <h1 className='text-2xl font-bold'>Gender</h1>
                <div className='space-y-2 mt-5'>
                    {genders.map((gender) => (
                        <button
                            key={gender}
                            onClick={() => setSelectedGender(gender)}
                            className={`px-3 py-3 cursor-pointer rounded-3xl w-full border transition-all ${selectedGender === gender
                                ? 'bg-primary border-primary text-white font-semibold'
                                : 'bg-gray-300 border-gray-400/20'
                                }`}
                        >
                            {gender}
                        </button>
                    ))}
                </div>

            </div>
            <div>
                <button 
                onClick={handleSave} 
                disabled={loading || !selectedGender}
                className={`${selectedGender ? "bg-primary" : "bg-gray-300" } relative cursor-pointer text-white w-full py-3 rounded-3xl font-semibold`}>
                    {loading ? <Spinner /> : "Next"}
                </button>
            </div>
        </div>
    )
}

export default Gender