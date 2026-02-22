import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

// Mock Data
const MOCK_COURSES = [
    { id: 1, title: 'AI Fundamentals', progress: 60, totalLessons: 5 },
    { id: 2, title: 'Machine Learning Basics', progress: 20, totalLessons: 5 },
    { id: 3, title: 'React for Beginners', progress: 90, totalLessons: 5 },
    { id: 4, title: "Advanced CSS & Animations", progress: 45, totalLessons: 5 },
    { id: 5, title: "Node.js Backend Mastery", progress: 10, totalLessons: 5 },
    { id: 6, title: "Fullstack Web Development", progress: 75, totalLessons: 5 },
];

export default function DashboardScreen() {
    return (
        <ScrollView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>My Learning Path</Text>
                <Text style={styles.headerSubtitle}>Continue where you left off</Text>
            </View>

            {/* Course List */}
            <View style={styles.courseList}>
                {MOCK_COURSES.map((course) => (
                    <TouchableOpacity key={course.id} style={styles.card}>
                        {/* Card Image Placeholder */}
                        <View style={styles.cardImageContainer}>
                            <View style={styles.badge}>
                                <Text style={styles.badgeText}>Course</Text>
                            </View>
                        </View>

                        {/* Card Content */}
                        <View style={styles.cardContent}>
                            <Text style={styles.courseTitle} numberOfLines={2}>
                                {course.title}
                            </Text>

                            <View style={styles.metaInfo}>
                                <Text style={styles.metaText}>{course.totalLessons} Lessons • 2h 30m</Text>
                            </View>

                            {/* Progress Bar */}
                            <View style={styles.progressContainer}>
                                <View style={styles.progressHeader}>
                                    <Text style={styles.progressLabel}>Progress</Text>
                                    <Text style={styles.progressValue}>{course.progress}%</Text>
                                </View>
                                <View style={styles.progressBarBackground}>
                                    <View
                                        style={[styles.progressBarFill, { width: `${course.progress}%` }]}
                                    />
                                </View>
                            </View>
                        </View>

                        {/* Card Footer */}
                        <View style={styles.cardFooter}>
                            <Text style={styles.footerText}>
                                {course.progress === 0 ? 'Start Course' : course.progress === 100 ? 'Review' : 'Continue Learning'}
                            </Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1F2937', // Dark mode background
    },
    header: {
        padding: 24,
        paddingTop: 60, // Safe area top margin roughly
        paddingBottom: 20,
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 8,
    },
    headerSubtitle: {
        fontSize: 16,
        color: '#9CA3AF',
    },
    courseList: {
        padding: 16,
        gap: 16,
    },
    card: {
        backgroundColor: '#374151', // Slightly lighter dark
        borderRadius: 16,
        overflow: 'hidden',
        marginBottom: 16,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    cardImageContainer: {
        height: 120,
        backgroundColor: '#6366F1', // Indigo color for image bg
        padding: 16,
        justifyContent: 'space-between',
    },
    badge: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
        alignSelf: 'flex-start',
    },
    badgeText: {
        color: '#FFFFFF',
        fontSize: 12,
        fontWeight: '600',
    },
    cardContent: {
        padding: 20,
    },
    courseTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 12,
    },
    metaInfo: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    metaText: {
        fontSize: 14,
        color: '#9CA3AF',
    },
    progressContainer: {
        marginBottom: 8,
    },
    progressHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    progressLabel: {
        fontSize: 14,
        color: '#D1D5DB',
    },
    progressValue: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#F59E0B',
    },
    progressBarBackground: {
        height: 8,
        backgroundColor: '#4B5563',
        borderRadius: 4,
        overflow: 'hidden',
    },
    progressBarFill: {
        height: '100%',
        backgroundColor: '#F59E0B',
        borderRadius: 4,
    },
    cardFooter: {
        backgroundColor: 'rgba(31, 41, 55, 0.5)',
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: 'rgba(75, 85, 99, 0.5)',
        alignItems: 'center',
    },
    footerText: {
        color: '#F59E0B',
        fontWeight: '600',
        fontSize: 14,
    },
});
