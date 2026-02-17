import React from 'react';


const Profile = () => {
	// Mock user data
	const user = {
		name: "Ashutosh Kumar",
		email: "ashutosh@example.com",
		avatar: "https://ui-avatars.com/api/?name=Ashutosh+Kumar&background=FF0000&color=fff&size=128",
		bio: "Passionate about coding, video content, and building cool web apps!",
		joined: "January 2024"
	};

	return (
		<div className="flex flex-col items-center justify-center min-h-[60vh] bg-gradient-to-br from-red-100 via-white to-red-200 py-10">
			<div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center w-full max-w-md border border-red-100">
				<img
					src={user.avatar}
					alt={user.name}
					className="w-28 h-28 rounded-full border-4 border-red-400 shadow mb-4 object-cover"
				/>
				<h2 className="text-2xl font-bold text-red-600 mb-1">{user.name}</h2>
				<p className="text-gray-500 text-sm mb-2">{user.email}</p>
				<p className="text-gray-700 text-center mb-4">{user.bio}</p>
				<div className="flex items-center gap-2 text-xs text-gray-400">
					<span className="inline-block w-2 h-2 bg-red-400 rounded-full"></span>
					Joined {user.joined}
				</div>
			</div>
		</div>
	);
};

export default Profile;
