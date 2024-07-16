import { useEffect, useState } from 'react';

const matrix = [
	{
		id: 1,
	},
	{
		id: 2,
	},
	{
		id: 3,
	},
	{
		id: 4,
	},
	{
		id: 5,
	},
	{
		id: 6,
	},
	{
		id: 7,
	},
	{
		id: 8,
	},
	{
		id: 9,
	},
];

const App = () => {
	const [clickedBoxes, setClickedBoxes] = useState([]);

	useEffect(() => {
		const handleKeyPress = (event) => {
			if (event.key === 'r') {
				setClickedBoxes([]);
			}
			if (event.key >= 1 && event.key <= 9) {
				if (!clickedBoxes.includes(`box-${event.key}`)) {
					setClickedBoxes((prev) => {
						return [...prev, `box-${event.key}`];
					});
				}
			}
		};

		if (clickedBoxes.length === 9) {
			setTimeout(() => {
				clickedBoxes.forEach((boxId, index) => {
					setTimeout(() => {
						console.log(boxId);
						document.querySelector(`#${boxId}`).classList.add('bg-orange-500');
					}, (index + 1) * 500);
				});
			}, 1000);
		}

		window.addEventListener('keydown', handleKeyPress);
		return () => {
			window.removeEventListener('keydown', handleKeyPress);
		};
	}, [clickedBoxes]);

	const changeTheme = () => {
		if (!document.querySelector('body').classList.contains('dark')) {
			document.querySelector('body').classList.add('dark');
		} else {
			document.querySelector('body').classList.remove('dark');
		}
	};

	return (
		<>
			<h1 className='text-center font-bold uppercase text-2xl pt-10 h-10'>
				Conversely Internship
			</h1>
			<button
				className='fixed top-5 right-5 font-bold uppercase bg-secondary text-white p-2 px-4 rounded-xl transition-all duration-200 select-none'
				onClick={changeTheme}
			>
				Change Theme
			</button>
			<div className='w-screen h-[calc(100vh-5rem)] flex justify-center items-center'>
				<div className='grid grid-cols-3 gap-5'>
					{matrix.map((item) => (
						<div
							id={`box-${item.id}`}
							key={item.id}
							className={`box size-20 flex justify-center items-center text-2xl font-bold rounded-md transition-all duration-300 cursor-pointer select-none text-white ${
								clickedBoxes.includes(`box-${item.id}`)
									? 'bg-green-500'
									: 'bg-secondary'
							}`}
							onClick={() => {
								console.log(`box-${item.id}`);
								setClickedBoxes((prev) => {
									return [...prev, `box-${item.id}`];
								});
							}}
						>
							{item.id}
						</div>
					))}
				</div>
			</div>
			<div className='flex justify-between items-center h-10 w-screen px-10 pb-10'>
				<h1 className='font-bold uppercase'>
					Clicked Boxes (press respective number):&nbsp;
					{clickedBoxes.map((box) => box.split('-')[1]).join(', ')}
				</h1>
				<button
					onClick={() => {
						setClickedBoxes([]);
					}}
					className='bottom-5 right-5 font-bold uppercase bg-red-900 text-red-100 p-2 px-4 rounded-xl transition-all duration-200 select-none'
				>
					Reset (press &apos;r&apos;)
				</button>
			</div>
		</>
	);
};

export default App;
