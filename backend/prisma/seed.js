const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // ─── Clean existing data ──────────────────────────────
  await prisma.syncLog.deleteMany();
  await prisma.mentorRequest.deleteMany();
  await prisma.progress.deleteMany();
  await prisma.streak.deleteMany();
  await prisma.xP.deleteMany();
  await prisma.question.deleteMany();
  await prisma.mission.deleteMany();
  await prisma.user.deleteMany();

  // ─── Create Users ─────────────────────────────────────
  const passwordHash = await bcrypt.hash('password123', 12);

  const admin = await prisma.user.create({
    data: {
      name: 'Admin User',
      email: 'admin@saathilearn.com',
      passwordHash,
      role: 'ADMIN',
    },
  });

  const mentor1 = await prisma.user.create({
    data: {
      name: 'Priya Sharma',
      email: 'priya@saathilearn.com',
      passwordHash,
      role: 'MENTOR',
      subjects: ['Mathematics', 'Physics'],
    },
  });

  const mentor2 = await prisma.user.create({
    data: {
      name: 'Rahul Verma',
      email: 'rahul@saathilearn.com',
      passwordHash,
      role: 'MENTOR',
      subjects: ['Science', 'Chemistry'],
    },
  });

  const students = [];
  const studentData = [
    { name: 'Aarav Patel', email: 'aarav@student.com', class: 8 },
    { name: 'Diya Singh', email: 'diya@student.com', class: 9 },
    { name: 'Kabir Khan', email: 'kabir@student.com', class: 7 },
    { name: 'Ananya Gupta', email: 'ananya@student.com', class: 10 },
    { name: 'Rohan Das', email: 'rohan@student.com', class: 6 },
  ];

  for (const s of studentData) {
    const student = await prisma.user.create({
      data: {
        name: s.name,
        email: s.email,
        passwordHash,
        role: 'STUDENT',
        class: s.class,
        subjects: ['Mathematics', 'Science'],
      },
    });
    students.push(student);

    // Initialize Streak and XP for each student
    await prisma.streak.create({
      data: { userId: student.id, currentStreak: 0, longestStreak: 0 },
    });
    await prisma.xP.create({
      data: { userId: student.id, totalXp: 0 },
    });
  }

  // ─── Create Missions & Questions ──────────────────────
  const missions = [
    // Class 6
    {
      class: 6,
      subject: 'Mathematics',
      topic: 'Basic Fractions',
      difficulty: 'EASY',
      questions: [
        {
          question: 'What is 1/2 + 1/4?',
          options: ['1/4', '3/4', '2/4', '1/2'],
          correctAnswer: '3/4',
          hintText: 'Find a common denominator first. Both fractions need the same bottom number.',
        },
        {
          question: 'Simplify 4/8',
          options: ['1/4', '1/2', '2/4', '4/8'],
          correctAnswer: '1/2',
          hintText: 'Divide both the numerator and denominator by their GCD.',
        },
        {
          question: 'Which fraction is larger: 2/3 or 3/5?',
          options: ['2/3', '3/5', 'They are equal', 'Cannot compare'],
          correctAnswer: '2/3',
          hintText: 'Convert both fractions to have a common denominator of 15.',
        },
        {
          question: 'What is 3/5 × 2/3?',
          options: ['6/15', '2/5', '5/8', '1/3'],
          correctAnswer: '2/5',
          hintText: 'Multiply numerators together and denominators together, then simplify.',
        },
      ],
    },
    {
      class: 6,
      subject: 'Science',
      topic: 'Living and Non-living Things',
      difficulty: 'EASY',
      questions: [
        {
          question: 'Which of the following is a characteristic of living things?',
          options: ['They can rust', 'They can grow', 'They are always big', 'They are made of metal'],
          correctAnswer: 'They can grow',
          hintText: 'Think about what happens to a seed when you plant it.',
        },
        {
          question: 'Which is a non-living thing?',
          options: ['Dog', 'Tree', 'Rock', 'Fish'],
          correctAnswer: 'Rock',
          hintText: 'Non-living things do not breathe, grow, or reproduce.',
        },
        {
          question: 'What do all living things need to survive?',
          options: ['Television', 'Water', 'Toys', 'Books'],
          correctAnswer: 'Water',
          hintText: 'Think about what you need every single day to stay alive.',
        },
      ],
    },
    // Class 7
    {
      class: 7,
      subject: 'Mathematics',
      topic: 'Integers',
      difficulty: 'MEDIUM',
      questions: [
        {
          question: 'What is (-5) + 8?',
          options: ['-13', '3', '13', '-3'],
          correctAnswer: '3',
          hintText: 'When adding a positive number to a negative number, subtract and keep the sign of the larger absolute value.',
        },
        {
          question: 'What is (-3) × (-4)?',
          options: ['-12', '12', '-7', '7'],
          correctAnswer: '12',
          hintText: 'Negative × Negative = Positive.',
        },
        {
          question: 'Arrange in ascending order: -7, 3, -2, 5, 0',
          options: ['-7, -2, 0, 3, 5', '5, 3, 0, -2, -7', '-2, -7, 0, 3, 5', '0, -2, -7, 3, 5'],
          correctAnswer: '-7, -2, 0, 3, 5',
          hintText: 'On a number line, numbers increase from left to right.',
        },
        {
          question: 'What is the absolute value of -15?',
          options: ['-15', '15', '0', '1'],
          correctAnswer: '15',
          hintText: 'Absolute value is the distance from zero — always positive.',
        },
      ],
    },
    // Class 8
    {
      class: 8,
      subject: 'Mathematics',
      topic: 'Algebraic Expressions',
      difficulty: 'MEDIUM',
      questions: [
        {
          question: 'Simplify: 3x + 5x',
          options: ['8x', '15x', '8x²', '35x'],
          correctAnswer: '8x',
          hintText: 'These are like terms — add the coefficients.',
        },
        {
          question: 'What is the value of 2x + 3 when x = 4?',
          options: ['8', '11', '14', '7'],
          correctAnswer: '11',
          hintText: 'Substitute x = 4 into the expression: 2(4) + 3.',
        },
        {
          question: 'Expand: (x + 2)(x + 3)',
          options: ['x² + 5x + 6', 'x² + 6x + 5', '2x + 6', 'x² + 5'],
          correctAnswer: 'x² + 5x + 6',
          hintText: 'Use FOIL method: First, Outer, Inner, Last.',
        },
        {
          question: 'Factorize: x² - 9',
          options: ['(x-3)(x+3)', '(x-9)(x+1)', '(x-3)²', 'x(x-9)'],
          correctAnswer: '(x-3)(x+3)',
          hintText: 'This is a difference of squares: a² - b² = (a-b)(a+b).',
        },
      ],
    },
    {
      class: 8,
      subject: 'Science',
      topic: 'Force and Pressure',
      difficulty: 'MEDIUM',
      questions: [
        {
          question: 'What is the SI unit of force?',
          options: ['Joule', 'Newton', 'Pascal', 'Watt'],
          correctAnswer: 'Newton',
          hintText: 'Named after the scientist who described laws of motion.',
        },
        {
          question: 'Pressure is defined as:',
          options: ['Force × Area', 'Force / Area', 'Force + Area', 'Force - Area'],
          correctAnswer: 'Force / Area',
          hintText: 'Think about why a sharp needle hurts more than a blunt object with the same force.',
        },
        {
          question: 'What type of force is friction?',
          options: ['Magnetic force', 'Contact force', 'Gravitational force', 'Electrostatic force'],
          correctAnswer: 'Contact force',
          hintText: 'Friction requires surfaces to be touching each other.',
        },
      ],
    },
    // Class 9
    {
      class: 9,
      subject: 'Mathematics',
      topic: 'Linear Equations in Two Variables',
      difficulty: 'MEDIUM',
      questions: [
        {
          question: 'Which of the following is a linear equation in two variables?',
          options: ['x² + y = 5', '2x + 3y = 7', 'x³ = 8', 'xy = 6'],
          correctAnswer: '2x + 3y = 7',
          hintText: 'A linear equation has variables with exponent 1 only.',
        },
        {
          question: 'Find the value of y when x = 1 in the equation 2x + y = 5',
          options: ['1', '2', '3', '4'],
          correctAnswer: '3',
          hintText: 'Substitute x = 1: 2(1) + y = 5, so y = ?',
        },
        {
          question: 'The graph of a linear equation in two variables is a:',
          options: ['Circle', 'Parabola', 'Straight line', 'Curve'],
          correctAnswer: 'Straight line',
          hintText: 'The word "linear" comes from "line".',
        },
        {
          question: 'How many solutions does a linear equation in two variables have?',
          options: ['One', 'Two', 'Finite', 'Infinitely many'],
          correctAnswer: 'Infinitely many',
          hintText: 'A line extends infinitely and every point on it is a solution.',
        },
      ],
    },
    {
      class: 9,
      subject: 'Science',
      topic: 'Atoms and Molecules',
      difficulty: 'HARD',
      questions: [
        {
          question: 'What is the chemical formula for water?',
          options: ['H2O', 'CO2', 'NaCl', 'O2'],
          correctAnswer: 'H2O',
          hintText: 'Water is made of hydrogen and oxygen atoms.',
        },
        {
          question: 'Who proposed the atomic theory?',
          options: ['Newton', 'Dalton', 'Einstein', 'Bohr'],
          correctAnswer: 'Dalton',
          hintText: 'This scientist proposed that all matter is made up of tiny indivisible particles in the early 1800s.',
        },
        {
          question: 'What is the valency of carbon?',
          options: ['1', '2', '3', '4'],
          correctAnswer: '4',
          hintText: 'Carbon has 4 electrons in its outer shell and needs 4 more to be stable.',
        },
      ],
    },
    // Class 10
    {
      class: 10,
      subject: 'Mathematics',
      topic: 'Quadratic Equations',
      difficulty: 'HARD',
      questions: [
        {
          question: 'Which is a quadratic equation?',
          options: ['2x + 3 = 0', 'x² + 5x + 6 = 0', 'x³ = 27', 'x = 5'],
          correctAnswer: 'x² + 5x + 6 = 0',
          hintText: 'A quadratic equation has the highest power of the variable as 2.',
        },
        {
          question: 'Find the roots of x² - 5x + 6 = 0',
          options: ['2, 3', '-2, -3', '1, 6', '-1, -6'],
          correctAnswer: '2, 3',
          hintText: 'Find two numbers that multiply to 6 and add to -5.',
        },
        {
          question: 'The discriminant of ax² + bx + c = 0 is:',
          options: ['b² - 4ac', 'b² + 4ac', '4ac - b²', '2ab - c'],
          correctAnswer: 'b² - 4ac',
          hintText: 'The discriminant determines the nature of the roots.',
        },
        {
          question: 'If discriminant = 0, the equation has:',
          options: ['No real roots', 'Two distinct roots', 'Two equal roots', 'Three roots'],
          correctAnswer: 'Two equal roots',
          hintText: 'Zero discriminant means the parabola just touches the x-axis.',
        },
      ],
    },
    {
      class: 10,
      subject: 'Science',
      topic: 'Chemical Reactions and Equations',
      difficulty: 'HARD',
      questions: [
        {
          question: 'Which of the following is a balanced equation?',
          options: ['H2 + O2 → H2O', '2H2 + O2 → 2H2O', 'H2 + O → H2O', 'H + O → HO'],
          correctAnswer: '2H2 + O2 → 2H2O',
          hintText: 'Count the number of atoms on each side — they must be equal.',
        },
        {
          question: 'Rusting of iron is an example of:',
          options: ['Combination reaction', 'Decomposition reaction', 'Displacement reaction', 'Oxidation reaction'],
          correctAnswer: 'Oxidation reaction',
          hintText: 'Iron reacts with oxygen and moisture.',
        },
        {
          question: 'What type of reaction is: CaCO3 → CaO + CO2?',
          options: ['Combination', 'Decomposition', 'Displacement', 'Double displacement'],
          correctAnswer: 'Decomposition',
          hintText: 'One reactant breaks down into two or more products.',
        },
      ],
    },
  ];

  for (const m of missions) {
    const mission = await prisma.mission.create({
      data: {
        class: m.class,
        subject: m.subject,
        topic: m.topic,
        difficulty: m.difficulty,
        questions: {
          create: m.questions.map((q) => ({
            question: q.question,
            options: q.options,
            correctAnswer: q.correctAnswer,
            hintText: q.hintText,
          })),
        },
      },
    });
    console.log(`  ✅ Mission: ${m.subject} — ${m.topic} (Class ${m.class})`);
  }

  console.log('\n📊 Seed Summary:');
  console.log(`  👤 Users: 1 admin, 2 mentors, ${students.length} students`);
  console.log(`  🎯 Missions: ${missions.length}`);
  console.log(`  📝 Questions: ${missions.reduce((acc, m) => acc + m.questions.length, 0)}`);
  console.log('\n🌱 Seeding complete!');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
