import { useState, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

function getWeekDates(startDate: Date): Date[] {
  const week: Date[] = [];
  const start = new Date(startDate);
  const day = start.getDay();
  const diff = start.getDate() - day + (day === 0 ? -6 : 1);
  const monday = new Date(start.setDate(diff));
  
  for (let i = 0; i < 7; i++) {
    const date = new Date(monday);
    date.setDate(monday.getDate() + i);
    week.push(date);
  }
  return week;
}

function formatTime(date: Date): string {
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
}

export default function HomeScreen() {
  const today = new Date();
  const [currentWeekStart, setCurrentWeekStart] = useState(() => {
    const day = today.getDay();
    const diff = today.getDate() - day + (day === 0 ? -6 : 1);
    const monday = new Date(today);
    monday.setDate(diff);
    return monday;
  });

  const weekDates = useMemo(() => getWeekDates(currentWeekStart), [currentWeekStart]);
  const isToday = (date: Date) => 
    date.getDate() === today.getDate() && 
    date.getMonth() === today.getMonth() && 
    date.getFullYear() === today.getFullYear();

  const goToPreviousWeek = () => {
    const prev = new Date(currentWeekStart);
    prev.setDate(prev.getDate() - 7);
    setCurrentWeekStart(prev);
  };

  const goToNextWeek = () => {
    const next = new Date(currentWeekStart);
    next.setDate(next.getDate() + 7);
    setCurrentWeekStart(next);
  };

  const goToCurrentWeek = () => {
    const day = today.getDay();
    const diff = today.getDate() - day + (day === 0 ? -6 : 1);
    const monday = new Date(today);
    monday.setDate(diff);
    setCurrentWeekStart(monday);
  };

  const formatWeekRange = () => {
    const start = weekDates[0];
    const end = weekDates[6];
    if (start.getMonth() === end.getMonth()) {
      return `${MONTHS[start.getMonth()].slice(0, 3)} ${start.getDate()} - ${end.getDate()}, ${start.getFullYear()}`;
    }
    return `${MONTHS[start.getMonth()].slice(0, 3)} ${start.getDate()} - ${MONTHS[end.getMonth()].slice(0, 3)} ${end.getDate()}, ${start.getFullYear()}`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Manifestation To Reality</Text>
        <View style={styles.dateTimeContainer}>
          <Text style={styles.dateText}>
            {MONTHS[today.getMonth()]} {today.getDate()}, {today.getFullYear()}
          </Text>
          <Text style={styles.timeText}>{formatTime(today)}</Text>
        </View>
      </View>

      <View style={styles.todayWeekContainer}>
        <View style={styles.todayCard}>
          <Text style={styles.todayLabel}>Today</Text>
          <Text style={styles.todayDate}>{WEEKDAYS[today.getDay() - 1]}</Text>
        </View>
        <View style={styles.weekCard}>
          <Text style={styles.weekLabel}>Week</Text>
          <Text style={styles.weekNumber}>
            {Math.ceil((today.getTime() - new Date(today.getFullYear(), 0, 1).getTime()) / (7 * 24 * 60 * 60 * 1000))}
          </Text>
        </View>
      </View>

      <View style={styles.timelineContainer}>
        <View style={styles.timelineHeader}>
          <Text style={styles.timelineTitle}>Week Timeline</Text>
          <Text style={styles.timelineRange}>{formatWeekRange()}</Text>
        </View>
        
        <View style={styles.navigationRow}>
          <Text style={styles.navButton} onPress={goToPreviousWeek}>← Prev</Text>
          <Text style={styles.currentButton} onPress={goToCurrentWeek}>Today</Text>
          <Text style={styles.navButton} onPress={goToNextWeek}>Next →</Text>
        </View>

        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.weekScrollContent}
        >
          {weekDates.map((date, index) => (
            <View 
              key={index} 
              style={[
                styles.dayCard,
                isToday(date) && styles.todayDayCard
              ]}
            >
              <Text style={[
                styles.weekdayText,
                isToday(date) && styles.todayText
              ]}>
                {WEEKDAYS[index]}
              </Text>
              <Text style={[
                styles.dateNumber,
                isToday(date) && styles.todayDateNumber
              ]}>
                {date.getDate()}
              </Text>
              <View style={[
                styles.timelineDot,
                isToday(date) && styles.todayDot
              ]} />
            </View>
          ))}
        </ScrollView>
      </View>

      <View style={styles.timelineLineContainer}>
        <View style={styles.timelineLine} />
        <View style={[
          styles.timelineProgress,
          { width: `${(today.getDay() === 0 ? 7 : today.getDay()) / 7 * 100}%` }
        ]} />
      </View>

      <View style={styles.contentPlaceholder}>
        <Text style={styles.placeholderText}>Your activities will appear here</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'hsl(var(--background))',
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'hsl(var(--foreground))',
    letterSpacing: -0.5,
  },
  dateTimeContainer: {
    marginTop: 8,
  },
  dateText: {
    fontSize: 16,
    color: 'hsl(var(--foreground))',
    opacity: 0.8,
  },
  timeText: {
    fontSize: 14,
    color: 'hsl(var(--foreground))',
    opacity: 0.6,
    marginTop: 2,
  },
  todayWeekContainer: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    gap: 12,
    marginBottom: 24,
  },
  todayCard: {
    flex: 1,
    backgroundColor: 'hsl(var(--card))',
    borderWidth: 1,
    borderColor: 'hsl(var(--border))',
    borderRadius: 0,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  weekCard: {
    flex: 1,
    backgroundColor: 'hsl(var(--card))',
    borderWidth: 1,
    borderColor: 'hsl(var(--border))',
    borderRadius: 0,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  todayLabel: {
    fontSize: 12,
    color: 'hsl(var(--muted-foreground))',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  todayDate: {
    fontSize: 24,
    fontWeight: '600',
    color: 'hsl(var(--foreground))',
    marginTop: 4,
  },
  weekLabel: {
    fontSize: 12,
    color: 'hsl(var(--muted-foreground))',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  weekNumber: {
    fontSize: 24,
    fontWeight: '600',
    color: 'hsl(var(--foreground))',
    marginTop: 4,
  },
  timelineContainer: {
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  timelineHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  timelineTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: 'hsl(var(--foreground))',
  },
  timelineRange: {
    fontSize: 12,
    color: 'hsl(var(--muted-foreground))',
  },
  navigationRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  navButton: {
    fontSize: 14,
    color: 'hsl(var(--primary))',
    fontWeight: '500',
  },
  currentButton: {
    fontSize: 14,
    color: 'hsl(var(--primary-foreground))',
    backgroundColor: 'hsl(var(--primary))',
    paddingHorizontal: 16,
    paddingVertical: 6,
    fontWeight: '500',
  },
  weekScrollContent: {
    paddingRight: 24,
    gap: 8,
  },
  dayCard: {
    width: 56,
    height: 80,
    backgroundColor: 'hsl(var(--card))',
    borderWidth: 1,
    borderColor: 'hsl(var(--border))',
    borderRadius: 0,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  todayDayCard: {
    backgroundColor: 'hsl(var(--primary))',
    borderColor: 'hsl(var(--primary))',
  },
  weekdayText: {
    fontSize: 11,
    color: 'hsl(var(--muted-foreground))',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  todayText: {
    color: 'hsl(var(--primary-foreground))',
  },
  dateNumber: {
    fontSize: 20,
    fontWeight: '600',
    color: 'hsl(var(--foreground))',
    marginTop: 4,
  },
  todayDateNumber: {
    color: 'hsl(var(--primary-foreground))',
  },
  timelineDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'hsl(var(--muted))',
    marginTop: 8,
  },
  todayDot: {
    backgroundColor: 'hsl(var(--primary-foreground))',
  },
  timelineLineContainer: {
    paddingHorizontal: 24,
    marginBottom: 24,
    position: 'relative',
    height: 4,
  },
  timelineLine: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: 'hsl(var(--muted))',
  },
  timelineProgress: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: 2,
    backgroundColor: 'hsl(var(--primary))',
  },
  contentPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  placeholderText: {
    fontSize: 14,
    color: 'hsl(var(--muted-foreground))',
  },
});
