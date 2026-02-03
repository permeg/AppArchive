import { useState, useMemo } from 'react';
import { Sidebar } from './components/Sidebar';
import { ApplicationList } from './components/ApplicationList';
import { ApplicationDetail } from './components/ApplicationDetails';
import { Plus } from 'lucide-react';
import type { ApplicationLog } from './types';

// Mock data
const mockApplications: ApplicationLog[] = [
  {
    id: '1',
    name: 'Google Software Engineering Internship',
    purpose: 'Internship',
    dateSubmitted: new Date('2025-01-15T10:30:00'),
    status: 'submitted',
    notes: 'Applied through university career portal',
    questions: [
      {
        id: 'q1',
        questionText: 'Describe a time when you demonstrated leadership in a technical project.',
        response: 'During my junior year, I led a team of four students in developing a full-stack web application for our local community center. I organized weekly standups, delegated tasks based on each member\'s strengths, and implemented a code review process that improved our code quality by 40%. When we faced a critical bug two days before the deadline, I coordinated a debugging session and we successfully deployed on time.',
        tags: ['Leadership', 'Teamwork', 'Web Development', 'Problem Solving']
      },
      {
        id: 'q2',
        questionText: 'What programming languages and technologies are you most comfortable with?',
        response: 'I have strong proficiency in Python, JavaScript, and Java. I\'ve built multiple projects using React and Node.js, and have experience with databases like PostgreSQL and MongoDB. I\'m also comfortable with Git, Docker, and CI/CD pipelines. Recently, I\'ve been exploring machine learning with TensorFlow.',
        tags: ['Python', 'JavaScript', 'React', 'Node.js', 'Machine Learning']
      }
    ]
  },
  {
    id: '2',
    name: 'Rhodes Scholarship Application',
    purpose: 'Scholarship',
    dateSubmitted: new Date('2025-01-20T14:00:00'),
    status: 'draft',
    notes: 'Need to revise personal statement',
    questions: [
      {
        id: 'q3',
        questionText: 'Describe your commitment to service and how you have made a difference in your community.',
        response: 'For the past three years, I\'ve volunteered at a local coding bootcamp teaching underrepresented high school students programming fundamentals. I developed a curriculum that has now taught over 150 students, with 60% going on to pursue computer science degrees. I also founded a mentorship program pairing students with tech professionals.',
        tags: ['Service', 'Leadership', 'Teaching', 'Community Impact']
      }
    ]
  },
  {
    id: '3',
    name: 'NSF Graduate Research Fellowship',
    purpose: 'Fellowship',
    dateSubmitted: new Date('2025-01-10T09:15:00'),
    status: 'accepted',
    notes: 'Received acceptance letter on Jan 28',
    questions: [
      {
        id: 'q4',
        questionText: 'Describe your research interests and how they align with NSF\'s mission.',
        response: 'My research focuses on developing accessible AI tools for early disease detection in underserved communities. I\'ve published two papers on using machine learning for medical image analysis and believe this aligns with NSF\'s goal of advancing scientific progress for societal benefit.',
        tags: ['Research', 'Machine Learning', 'Healthcare', 'Social Impact']
      },
      {
        id: 'q5',
        questionText: 'Describe a time when you had to overcome a significant challenge in your research.',
        response: 'During my summer research project, our dataset had significant bias issues that were affecting model accuracy. I spent two months researching bias mitigation techniques, implemented three different approaches, and ultimately improved our model\'s fairness metrics by 35% while maintaining accuracy.',
        tags: ['Research', 'Problem Solving', 'Machine Learning', 'Perseverance']
      }
    ]
  }
];

const allTags = [
  'Leadership', 'Teamwork', 'Problem Solving', 'Research', 
  'Python', 'JavaScript', 'React', 'Node.js', 'Machine Learning',
  'Web Development', 'Teaching', 'Service', 'Community Impact',
  'Healthcare', 'Social Impact', 'Perseverance'
];

export default function App() {
  const [applications, setApplications] = useState<ApplicationLog[]>(mockApplications);
  const [selectedApp, setSelectedApp] = useState<ApplicationLog | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'date-desc' | 'date-asc'>('date-desc');

  // Filter and search applications
  const filteredApplications = useMemo(() => {
    let filtered = applications;

    // Filter by tags
    if (selectedTags.length > 0) {
      filtered = filtered.filter(app =>
        app.questions.some(q =>
          q.tags.some(tag => selectedTags.includes(tag))
        )
      );
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(app =>
        app.name.toLowerCase().includes(query) ||
        app.purpose.toLowerCase().includes(query) ||
        app.notes?.toLowerCase().includes(query) ||
        app.questions.some(q =>
          q.questionText.toLowerCase().includes(query) ||
          q.response.toLowerCase().includes(query)
        )
      );
    }

    // Sort by date
    const sorted = [...filtered].sort((a, b) => {
      if (sortBy === 'date-desc') {
        return b.dateSubmitted.getTime() - a.dateSubmitted.getTime();
      } else {
        return a.dateSubmitted.getTime() - b.dateSubmitted.getTime();
      }
    });

    return sorted;
  }, [applications, selectedTags, searchQuery, sortBy]);

  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const handleClearFilters = () => {
    setSelectedTags([]);
    setSearchQuery('');
  };

  const handleUpdateTags = (appId: string, questionId: string, newTags: string[]) => {
    setApplications(prev => prev.map(app => {
      if (app.id === appId) {
        return {
          ...app,
          questions: app.questions.map(q =>
            q.id === questionId ? { ...q, tags: newTags } : q
          )
        };
      }
      return app;
    }));

    // Update selected app if it's currently open
    if (selectedApp?.id === appId) {
      setSelectedApp(prev => {
        if (!prev) return null;
        return {
          ...prev,
          questions: prev.questions.map(q =>
            q.id === questionId ? { ...q, tags: newTags } : q
          )
        };
      });
    }
  };

  const handleAddNewLog = () => {
    // Placeholder for add new log functionality
    console.log('Add new log clicked');
  };

  return (
    <div className="flex h-screen bg-neutral-50">
      <Sidebar
        allTags={allTags}
        selectedTags={selectedTags}
        onTagToggle={handleTagToggle}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onClearFilters={handleClearFilters}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="border-b border-neutral-200 bg-white px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="font-semibold text-neutral-900">Application Response Manager</h1>
            <p className="text-sm text-neutral-500 mt-0.5">
              {filteredApplications.length} {filteredApplications.length === 1 ? 'application' : 'applications'}
            </p>
          </div>
          <button
            onClick={handleAddNewLog}
            className="flex items-center gap-2 bg-neutral-900 text-white px-4 py-2 rounded-lg hover:bg-neutral-800 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add New Log
          </button>
        </header>

        <div className="flex-1 overflow-hidden">
          {selectedApp ? (
            <ApplicationDetail
              application={selectedApp}
              onBack={() => setSelectedApp(null)}
              onUpdateTags={handleUpdateTags}
            />
          ) : (
            <ApplicationList
              applications={filteredApplications}
              onSelectApp={setSelectedApp}
              sortBy={sortBy}
              onSortChange={setSortBy}
              hasActiveFilters={selectedTags.length > 0 || searchQuery.trim().length > 0}
              onClearFilters={handleClearFilters}
            />
          )}
        </div>
      </div>
    </div>
  );
}
