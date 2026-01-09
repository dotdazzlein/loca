import React from 'react'
import VideoCall from '../common/VideoCall'
import { BiVideo } from 'react-icons/bi'

const Home: React.FC = () => {

    return (
        <div className='h-full'>
            <VideoCall />
            <HeroSection />
        </div>
    )
}

export default Home

const HeroSection: React.FC = () => {
    return (
        <section className="w-full bg-white py-20 px-4">
            <div className="max-w-5xl mx-auto text-center">

                {/* Title */}
                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
                    Snack Video Chat & Meet New People
                </h1>

                {/* Subtitle */}
                <p className="mt-6 text-lg md:text-xl text-gray-600">
                    Meet Friends and talk to people now!
                </p>

                <p className="mt-2 text-gray-500">
                    Snack is a global video chat platform for meeting new people.
                </p>

                {/* Feature Card */}
                <div className="mt-14 flex justify-center">
                    <div className="w-full max-w-3xl rounded-2xl border border-gray-200 p-6 md:p-8 flex items-start gap-4">

                        {/* Icon */}
                        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-100">
                            <BiVideo className="text-gray-900" />
                        </div>

                        {/* Content */}
                        <div className="text-left">
                            <h3 className="text-xl font-semibold text-gray-900">
                                Video Chat
                            </h3>
                            <p className="mt-2 text-gray-600 leading-relaxed">
                                Experience instantly connection with millions of people nearby
                                and around the world. You never know who you might meet next!
                            </p>
                        </div>
                    </div>
                </div>

                {/* FAQs title (bottom spacing like screenshot) */}
                <h2 className="mt-32 text-4xl font-extrabold text-gray-900">
                    FAQs
                </h2>
            </div>
        </section>
    );
};

HeroSection;
