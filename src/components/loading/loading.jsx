export default function Loading(){
    return(
    <div className='flex space-x-2 justify-center items-center  h-screen '>
        <span className='sr-only'>Loading...</span>
        <div className='h-4 w-4  rounded-full bg-red-500 animate-bounce [animation-delay:-0.3s]'></div>
        <div className='h-4 w-4 rounded-full bg-red-500 animate-bounce [animation-delay:-0.15s]'></div>
        <div className='h-4 w-4  rounded-full bg-red-500 animate-bounce'></div>
    </div>      

    )
}