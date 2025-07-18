import React from 'react';
import { Share2, Filter, Star, MoreHorizontal } from 'lucide-react';

interface ProjectSectionProps {
    projectName?: string;
    projectDescription?: string;
    status?: string;
    lastUpdated?: string;
    className?: string;
}

const ProjectSection: React.FC<ProjectSectionProps> = ({
    projectName = "Sport Xi Project",
    projectDescription = "Event production and management platform",
    status = "In Progress",
    lastUpdated = Date.now().toLocaleString(),
    className = ""
}) => {
    return (
        <div className={`bg-white border-b border-gray-200 px-4 md:px-6 py-6 ${className}`}>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-xl flex items-center justify-center shadow-sm">
                        <span className="text-white font-bold text-lg">S</span>
                    </div>

                    <div>
                        <div className="flex items-center gap-3 mb-1">
                            <h1 className="text-xl md:text-2xl font-bold text-gray-900">{projectName}</h1>
                            <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">
                                {status}
                            </span>
                        </div>
                        <p className="text-gray-600 text-sm md:text-base">{projectDescription}</p>
                        <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                            <span>Last updated: {lastUpdated}</span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <button className="hidden md:flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium transition-colors">
                        <Share2 size={16} />
                        Share
                    </button>
                    <button className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium transition-colors">
                        <Star size={16} />
                        Star
                    </button>
                    <button className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium transition-colors">
                        <Filter size={16} />
                        Filter
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <MoreHorizontal size={16} className="text-gray-500" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProjectSection;