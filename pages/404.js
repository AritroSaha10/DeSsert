import Link from 'next/link'

export default function ErrorPage() {
    return (
        <div className='h-full grid place-items-center'>
            <div>
                <h1 className='text-4xl text-center'>You&apos;re in the wrong place!</h1>
                <button className='bg-zinc-800 font-bold p-4 rounded-xl text-white block mx-auto mt-6 hover:bg-zinc-900 transition'>
                    <Link href="/">Go back home</Link>
                </button>
            </div>
        </div>
    )
}

