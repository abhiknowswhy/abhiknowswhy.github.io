import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Github, Calendar, Tag, Star, CheckCircle } from 'lucide-react';
import { getProjectById } from '../lib/dataLoader';

export default function ProjectDetail() {
  const { id } = useParams();
  const project = id ? getProjectById(id) : null;

  if (!project) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Project Not Found
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            The project you're looking for doesn't exist.
          </p>
          <Link
            to="/projects"
            className="inline-flex items-center px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300';
      case 'in-progress':
        return 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300';
      case 'planning':
        return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300';
      case 'archived':
        return 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300';
      default:
        return 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300';
    }
  };

  return (
    <motion.div
      className="min-h-screen pt-20"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Back Button */}
        <motion.div variants={itemVariants} className="mb-8">
          <Link
            to="/projects"
            className="inline-flex items-center text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
            Back to Projects
          </Link>
        </motion.div>

        {/* Project Header */}
        <motion.div variants={itemVariants} className="mb-12">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white">
                  {project.title}
                </h1>
                {project.featured && (
                  <Star className="w-6 h-6 text-yellow-500 fill-current" />
                )}
              </div>
              
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">
                {project.description}
              </p>

              <div className="flex flex-wrap items-center gap-4 mb-6">
                <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(project.status)}`}>
                  {project.status.charAt(0).toUpperCase() + project.status.slice(1).replace('-', ' ')}
                </span>
                
                <div className="flex items-center text-gray-600 dark:text-gray-400">
                  <Calendar className="w-4 h-4 mr-2" />
                  {project.startDate} {project.endDate && `- ${project.endDate}`}
                </div>

                <div className="flex items-center text-gray-600 dark:text-gray-400">
                  <Tag className="w-4 h-4 mr-2" />
                  {project.category}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4">
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors duration-200"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Live Demo
                  </a>
                )}
                
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-6 py-3 glass-card hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium rounded-lg transition-colors duration-200"
                  >
                    <Github className="w-4 h-4 mr-2" />
                    Source Code
                  </a>
                )}

                {project.caseStudyUrl && (
                  <a
                    href={project.caseStudyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-6 py-3 glass-card hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium rounded-lg transition-colors duration-200"
                  >
                    Case Study
                  </a>
                )}
              </div>
            </div>

            {/* Project Image */}
            <div className="lg:w-96">
              <div className="glass-card p-6 rounded-xl">
                <img
                  src={project.thumbnail}
                  alt={project.title}
                  className="w-full rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Project Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Technologies */}
          <motion.div variants={itemVariants} className="glass-card p-6 rounded-xl">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Technologies Used
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 text-sm font-medium bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Tags */}
          <motion.div variants={itemVariants} className="glass-card p-6 rounded-xl">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Tags
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-sm font-medium glass-card text-gray-700 dark:text-gray-300 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Metrics */}
          {project.metrics && project.metrics.length > 0 && (
            <motion.div variants={itemVariants} className="glass-card p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Key Metrics
              </h3>
              <div className="space-y-3">
                {project.metrics.map((metric, index) => (
                  <div key={index} className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">{metric.label}</span>
                    <span className="font-medium text-gray-900 dark:text-white">{metric.value}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>

        {/* Long Description */}
        {project.longDescription && (
          <motion.section variants={itemVariants} className="mb-12">
            <div className="glass-card p-8 rounded-xl">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                About This Project
              </h2>
              <div className="prose prose-gray dark:prose-invert max-w-none">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {project.longDescription}
                </p>
              </div>
            </div>
          </motion.section>
        )}

        {/* Features */}
        {project.features.length > 0 && (
          <motion.section variants={itemVariants} className="mb-12">
            <div className="glass-card p-8 rounded-xl">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Key Features
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.features.map((feature, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-1 mr-3 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.section>
        )}

        {/* Challenges and Solutions */}
        {(project.challenges && project.challenges.length > 0) || (project.solutions && project.solutions.length > 0) && (
          <motion.section variants={itemVariants} className="mb-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {project.challenges && project.challenges.length > 0 && (
                <div className="glass-card p-8 rounded-xl">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                    Challenges Faced
                  </h3>
                  <ul className="space-y-3">
                    {project.challenges.map((challenge, index) => (
                      <li key={index} className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        • {challenge}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {project.solutions && project.solutions.length > 0 && (
                <div className="glass-card p-8 rounded-xl">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                    Solutions Implemented
                  </h3>
                  <ul className="space-y-3">
                    {project.solutions.map((solution, index) => (
                      <li key={index} className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        • {solution}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </motion.section>
        )}

        {/* Gallery */}
        {project.images.length > 0 && (
          <motion.section variants={itemVariants} className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Project Gallery
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {project.images.map((image, index) => (
                <div key={index} className="glass-card p-4 rounded-xl">
                  <img
                    src={image}
                    alt={`${project.title} screenshot ${index + 1}`}
                    className="w-full rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                  />
                </div>
              ))}
            </div>
          </motion.section>
        )}
      </div>
    </motion.div>
  );
}
