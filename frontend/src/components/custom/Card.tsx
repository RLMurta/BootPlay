interface Props {
    onClick?: () => void;
    key?: number;
    url: string;
    name: string;
    value?: number;
}

export function Card({ onClick, key, url, name, value }: Props) {
    return (
        <>
            <div key={key} style={{ '--bg-card': `url(${url})` } as React.CSSProperties} className="bg-[image:var(--bg-card)] bg-cover bg-no-repeat w-60 h-[245px] rounded-md">
                <div onClick={onClick} className="flex h-full justify-center items-center backdrop-brightness-50 p-6 cursor-pointer">
                    <h1 className="text-2xl font-semibold text-white">{name}</h1>
                    <p className='text-lg font-semibold text-white absolute bottom-2 right-2 mr-4 mb-4'>R$ {value}</p>
                </div>
            </div>
        </>
    )
}
