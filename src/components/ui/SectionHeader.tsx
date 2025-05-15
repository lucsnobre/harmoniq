import { FiChevronRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';

interface SectionHeaderProps {
  title: string;
  viewAllLink?: string;
  children?: React.ReactNode;
}

const SectionHeader = ({ title, viewAllLink, children }: SectionHeaderProps) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center">
        <h2 className="text-xl md:text-2xl font-bold text-shadow-glow">
          {title}
        </h2>
        {children}
      </div>

      {viewAllLink && (
        <Link
          to={viewAllLink}
          className="flex items-center text-sm text-aero-blue hover:text-aero-blue-dark transition-colors glass-button px-3 py-1"
        >
          View All <FiChevronRight className="ml-1" />
        </Link>
      )}
    </div>
  );
};

export default SectionHeader;
