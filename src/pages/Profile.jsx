import React from 'react';
import { FaEnvelope, FaCalendarAlt, FaUser, FaVideo } from 'react-icons/fa';

const Profile = () => {
	// Mock user data
	const user = {
		name: "Ashutosh Kumar",
		email: "ashutosh@example.com",
		avatar: "https://ui-avatars.com/api/?name=Ashutosh+Kumar&background=FF0000&color=fff&size=128",
		bio: "Passionate about coding, video content, and building cool web apps!",
		joined: "January 2024",
		stats: {
			videosWatched: 127,
			watchTime: "45h",
			favoriteCategory: "Technology"
		}
	};

	return (
		<div className="w-full min-h-[calc(100vh-200px)] py-4 sm:py-6 lg:py-8">
			<div className="max-w-4xl mx-auto space-y-6">
				{/* Profile Header Card */}
				<div className="card p-6 sm:p-8 lg:p-10">
					<div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
						{/* Avatar */}
						<div className="relative">
							<div className="absolute inset-0 bg-gradient-to-br from-[var(--app-accent)] to-[var(--app-accent-2)] rounded-full blur-xl opacity-50 animate-pulse" />
							<img
								src={user.avatar}
								alt={user.name}
								className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-white/20 shadow-2xl object-cover ring-4 ring-white/10"
							/>
							<div className="absolute -bottom-1 -right-1 w-8 h-8 bg-green-500 rounded-full border-4 border-white/20 flex items-center justify-center">
								<span className="w-3 h-3 bg-white rounded-full" />
							</div>
						</div>

						{/* User Info */}
						<div className="flex-1 text-center sm:text-left space-y-3">
							<div>
								<h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-2">{user.name}</h1>
								<div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-sm faint">
									<div className="flex items-center gap-2">
										<FaEnvelope className="w-4 h-4" />
										<span>{user.email}</span>
									</div>
									<div className="flex items-center gap-2">
										<FaCalendarAlt className="w-4 h-4" />
										<span>Joined {user.joined}</span>
									</div>
								</div>
							</div>
							<p className="text-base text-white/80 leading-relaxed max-w-2xl">{user.bio}</p>
						</div>
					</div>
				</div>

				{/* Stats Grid */}
				<div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
					<div className="card p-5 group hover:scale-[1.02] transition-transform">
						<div className="flex items-center gap-4">
							<div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[var(--app-accent)]/20 to-[var(--app-accent-2)]/20 flex items-center justify-center border border-white/10 group-hover:border-white/20 transition-colors">
								<FaVideo className="w-6 h-6 text-[var(--app-accent)]" />
							</div>
							<div>
								<div className="text-2xl font-bold text-white">{user.stats.videosWatched}</div>
								<div className="text-xs faint">Videos Watched</div>
							</div>
						</div>
					</div>

					<div className="card p-5 group hover:scale-[1.02] transition-transform">
						<div className="flex items-center gap-4">
							<div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[var(--app-accent)]/20 to-[var(--app-accent-2)]/20 flex items-center justify-center border border-white/10 group-hover:border-white/20 transition-colors">
								<svg className="w-6 h-6 text-[var(--app-accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
								</svg>
							</div>
							<div>
								<div className="text-2xl font-bold text-white">{user.stats.watchTime}</div>
								<div className="text-xs faint">Total Watch Time</div>
							</div>
						</div>
					</div>

					<div className="card p-5 group hover:scale-[1.02] transition-transform">
						<div className="flex items-center gap-4">
							<div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[var(--app-accent)]/20 to-[var(--app-accent-2)]/20 flex items-center justify-center border border-white/10 group-hover:border-white/20 transition-colors">
								<FaUser className="w-6 h-6 text-[var(--app-accent)]" />
							</div>
							<div>
								<div className="text-lg font-bold text-white truncate">{user.stats.favoriteCategory}</div>
								<div className="text-xs faint">Favorite Category</div>
							</div>
						</div>
					</div>
				</div>

				{/* Additional Info Section */}
				<div className="card p-6 sm:p-8">
					<h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
						<FaUser className="w-5 h-5 text-[var(--app-accent)]" />
						Account Information
					</h2>
					<div className="space-y-3">
						<div className="flex items-center justify-between py-2 border-b border-white/5">
							<span className="text-sm faint">Member Since</span>
							<span className="text-sm font-semibold text-white">{user.joined}</span>
						</div>
						<div className="flex items-center justify-between py-2 border-b border-white/5">
							<span className="text-sm faint">Email</span>
							<span className="text-sm font-semibold text-white">{user.email}</span>
						</div>
						<div className="flex items-center justify-between py-2">
							<span className="text-sm faint">Status</span>
							<span className="inline-flex items-center gap-2 text-sm">
								<span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
								<span className="font-semibold text-white">Active</span>
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Profile;
