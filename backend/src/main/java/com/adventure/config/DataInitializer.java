package com.adventure.config;

import com.adventure.entity.*;
import com.adventure.repository.*;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private static final Logger logger = LoggerFactory.getLogger(DataInitializer.class);

    private final UserRepository userRepository;
    private final ChildProfileRepository childProfileRepository;
    private final ParentProfileRepository parentProfileRepository;
    private final SubjectRepository subjectRepository;
    private final WorldRepository worldRepository;
    private final ActivityRepository activityRepository;
    private final QuestionRepository questionRepository;
    private final AchievementRepository achievementRepository;
    private final RewardRepository rewardRepository;
    private final DailyChallengeRepository dailyChallengeRepository;
    private final ChildRewardRepository childRewardRepository;
    private final ChildAchievementRepository childAchievementRepository;
    private final AttemptRepository attemptRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        if (userRepository.count() > 0) {
            logger.info("Database already seeded with initial data.");
            return;
        }

        logger.info("🌟 Initializing default educational adventure dataset...");

        // 1. Subjects
        Subject math = subjectRepository.save(Subject.builder()
                .code("MATH")
                .name("Mathematics Island")
                .icon("🧮")
                .description("Fun visual counting, addition, shapes, and patterns!")
                .colorTheme("#ff5722")
                .build());

        Subject mystery = subjectRepository.save(Subject.builder()
                .code("MYSTERY")
                .name("Mystery House")
                .icon("🔍")
                .description("Friendly detective adventure, clue searches, and secret keys!")
                .colorTheme("#9c27b0")
                .build());

        Subject coding = subjectRepository.save(Subject.builder()
                .code("CODING")
                .name("Coding Lab")
                .icon("💻")
                .description("Control cute robots with step-by-step visual block programming!")
                .colorTheme("#00bcd4")
                .build());

        Subject brain = subjectRepository.save(Subject.builder()
                .code("BRAIN")
                .name("Brain Forest")
                .icon("🧠")
                .description("Flip memory cards, find the odd one out, and boost recall!")
                .colorTheme("#4caf50")
                .build());

        Subject puzzle = subjectRepository.save(Subject.builder()
                .code("PUZZLE")
                .name("Puzzle Castle")
                .icon("🧩")
                .description("Interactive tangrams, shape matching, and logic riddles!")
                .colorTheme("#ff9800")
                .build());

        Subject creative = subjectRepository.save(Subject.builder()
                .code("CREATIVE")
                .name("Creativity Zone")
                .icon("🎨")
                .description("3D Room decoration, avatar styling, and colorful building blocks!")
                .colorTheme("#e91e63")
                .build());

        // 2. Worlds
        World homeWorld = worldRepository.save(World.builder()
                .code("HOME")
                .name("Adventure Home")
                .icon("🏠")
                .description("Central 3D floating island hub and starting zone")
                .backgroundSky("linear-gradient(180deg, #64b5f6, #e1f5fe)")
                .portalColor("#ffca28")
                .orderIndex(1)
                .unlockedByDefault(true)
                .build());

        World mathWorld = worldRepository.save(World.builder()
                .code("MATH_ISLAND")
                .name("Math Island")
                .icon("🧮")
                .description("A tropical island filled with fruit counting and magic number portals")
                .backgroundSky("linear-gradient(180deg, #ff8a65, #ffe0b2)")
                .portalColor("#ff5722")
                .orderIndex(2)
                .unlockedByDefault(true)
                .build());

        World mysteryWorld = worldRepository.save(World.builder()
                .code("MYSTERY_HOUSE")
                .name("Mystery House")
                .icon("🔍")
                .description("A cozy, glowing detective mansion with secrets and hidden treasure chests")
                .backgroundSky("linear-gradient(180deg, #ba68c8, #f3e5f5)")
                .portalColor("#9c27b0")
                .orderIndex(3)
                .unlockedByDefault(true)
                .build());

        World codingWorld = worldRepository.save(World.builder()
                .code("CODING_LAB")
                .name("Coding Lab")
                .icon("💻")
                .description("High-tech neon playground where robot buddies learn commands")
                .backgroundSky("linear-gradient(180deg, #4dd0e1, #e0f7fa)")
                .portalColor("#00bcd4")
                .orderIndex(4)
                .unlockedByDefault(true)
                .build());

        World brainWorld = worldRepository.save(World.builder()
                .code("BRAIN_FOREST")
                .name("Brain Forest")
                .icon("🧠")
                .description("A magical enchanted forest with glowing memory mushrooms")
                .backgroundSky("linear-gradient(180deg, #81c784, #e8f5e9)")
                .portalColor("#4caf50")
                .orderIndex(5)
                .unlockedByDefault(true)
                .build());

        World puzzleWorld = worldRepository.save(World.builder()
                .code("PUZZLE_CASTLE")
                .name("Puzzle Castle")
                .icon("🧩")
                .description("A grand fairytale castle where towers are unlocked with shape keys")
                .backgroundSky("linear-gradient(180deg, #ffb74d, #fff3e0)")
                .portalColor("#ff9800")
                .orderIndex(6)
                .unlockedByDefault(true)
                .build());

        World creativeWorld = worldRepository.save(World.builder()
                .code("CREATIVITY_ZONE")
                .name("Creativity Zone")
                .icon("🎨")
                .description("A vibrant sandbox studio to build, color, and furnish your dream space")
                .backgroundSky("linear-gradient(180deg, #f06292, #fce4ec)")
                .portalColor("#e91e63")
                .orderIndex(7)
                .unlockedByDefault(true)
                .build());

        // 3. Activities & Questions
        seedMathActivities(math, mathWorld);
        seedMysteryActivities(mystery, mysteryWorld);
        seedCodingActivities(coding, codingWorld);
        seedBrainActivities(brain, brainWorld);
        seedPuzzleActivities(puzzle, puzzleWorld);
        seedCreativeActivities(creative, creativeWorld);

        // 4. Rewards (Shop Items)
        seedRewards();

        // 5. Achievements
        seedAchievements();

        // 6. Daily Challenges
        seedDailyChallenges();

        // 7. Demo Users
        seedDemoUsers();

        logger.info("✅ Database successfully populated with 3D Adventure content!");
    }

    private void seedMathActivities(Subject math, World world) {
        Activity act1 = activityRepository.save(Activity.builder()
                .subject(math)
                .world(world)
                .title("🍎 Apple Orchard Counting")
                .instructions("Count the fresh apples and select the matching number!")
                .difficulty(1)
                .rewardCoins(15)
                .rewardStars(1)
                .rewardXp(30)
                .iconEmoji("🍎")
                .build());

        questionRepository.save(Question.builder()
                .activity(act1)
                .prompt("How many red apples are on the branch?")
                .questionType("CHOICE")
                .visualData("🍎 🍎 🍎")
                .optionsJson("[\"2\", \"3\", \"4\", \"5\"]")
                .correctAnswer("3")
                .hint("Count each apple one by one!")
                .explanation("There are exactly 3 apples! 🍎🍎🍎")
                .build());

        questionRepository.save(Question.builder()
                .activity(act1)
                .prompt("How many apples do we get if we put these together?")
                .questionType("CHOICE")
                .visualData("🍎 🍎 + 🍎 🍎 🍎 = ?")
                .optionsJson("[\"4\", \"5\", \"6\", \"7\"]")
                .correctAnswer("5")
                .hint("2 plus 3 equals 5!")
                .explanation("2 + 3 = 5 apples!")
                .build());

        Activity act2 = activityRepository.save(Activity.builder()
                .subject(math)
                .world(world)
                .title("⭐ Shiny Star Patterns")
                .instructions("Look at the pattern and find what comes next!")
                .difficulty(2)
                .rewardCoins(20)
                .rewardStars(2)
                .rewardXp(40)
                .iconEmoji("⭐")
                .build());

        questionRepository.save(Question.builder()
                .activity(act2)
                .prompt("What comes next in the pattern?")
                .questionType("CHOICE")
                .visualData("⭐ 🔵 ⭐ 🔵 ⭐ ?")
                .optionsJson("[\"⭐\", \"🔵\", \"🔺\", \"🟢\"]")
                .correctAnswer("🔵")
                .hint("Star, Circle, Star, Circle, Star... what comes next?")
                .explanation("The pattern alternates between Star and Circle!")
                .build());
    }

    private void seedMysteryActivities(Subject mystery, World world) {
        Activity act1 = activityRepository.save(Activity.builder()
                .subject(mystery)
                .world(world)
                .title("🗝️ The Golden Key Mystery")
                .instructions("Use your magnifying glass to match the right key to the treasure chest!")
                .difficulty(1)
                .rewardCoins(20)
                .rewardStars(1)
                .rewardXp(35)
                .iconEmoji("🗝️")
                .build());

        questionRepository.save(Question.builder()
                .activity(act1)
                .prompt("The treasure chest lock is shaped like a STAR ⭐. Which key will open it?")
                .questionType("CHOICE")
                .visualData("🔒[⭐] -> 🗝️[Circle] | 🗝️[Square] | 🗝️[Star]")
                .optionsJson("[\"Circle Key ⚪\", \"Square Key 🟦\", \"Star Key ⭐\"]")
                .correctAnswer("Star Key ⭐")
                .hint("Match the shape of the lock!")
                .explanation("The Star Key matches the Star Lock perfectly! 🗝️✨")
                .build());

        questionRepository.save(Question.builder()
                .activity(act1)
                .prompt("🔍 Footprint Clue: Follow the puppy footprints to find who ate the treat!")
                .questionType("CHOICE")
                .visualData("🐾 🐾 🐾 ➔ 🐶 [Puppy] | 🐱 [Kitten] | 🐸 [Frog]")
                .optionsJson("[\"Puppy 🐶\", \"Kitten 🐱\", \"Frog 🐸\"]")
                .correctAnswer("Puppy 🐶")
                .hint("Look closely at the happy tail wagging!")
                .explanation("Great detective work! The friendly puppy was the mystery finder!")
                .build());
    }

    private void seedCodingActivities(Subject coding, World world) {
        Activity act1 = activityRepository.save(Activity.builder()
                .subject(coding)
                .world(world)
                .title("🤖 Help Robo-Buddy Reach the Star")
                .instructions("Arrange the command blocks so the robot walks to the star!")
                .difficulty(1)
                .rewardCoins(25)
                .rewardStars(2)
                .rewardXp(50)
                .iconEmoji("🤖")
                .build());

        questionRepository.save(Question.builder()
                .activity(act1)
                .prompt("The robot is 2 steps away from the Star ⭐. Which sequence moves Robo-Buddy there?")
                .questionType("BLOCK_CODE")
                .visualData("🤖 ⬜ ⬜ ⭐")
                .optionsJson("[\"MOVE_UP, MOVE_UP\", \"MOVE_RIGHT, MOVE_RIGHT\", \"TURN_LEFT, JUMP\"]")
                .correctAnswer("MOVE_RIGHT, MOVE_RIGHT")
                .hint("Robo needs to move forward 2 times to reach the star!")
                .explanation("Two forward steps landed Robo right on the star! 🚀")
                .build());

        questionRepository.save(Question.builder()
                .activity(act1)
                .prompt("Obstacle ahead! There is a rock 🪨. How does Robo go around it?")
                .questionType("BLOCK_CODE")
                .visualData("🤖 🪨 ⭐")
                .optionsJson("[\"TURN_LEFT, MOVE_FORWARD, TURN_RIGHT, MOVE_FORWARD\", \"MOVE_FORWARD into rock\", \"SLEEP\"]")
                .correctAnswer("TURN_LEFT, MOVE_FORWARD, TURN_RIGHT, MOVE_FORWARD")
                .hint("Turn around the obstacle first!")
                .explanation("Smart navigation! Robo looped safely around the rock! 🤖✨")
                .build());
    }

    private void seedBrainActivities(Subject brain, World world) {
        Activity act1 = activityRepository.save(Activity.builder()
                .subject(brain)
                .world(world)
                .title("🃏 Enchanted Memory Forest")
                .instructions("Remember the card positions and find the hidden pair!")
                .difficulty(1)
                .rewardCoins(15)
                .rewardStars(1)
                .rewardXp(30)
                .iconEmoji("🧠")
                .build());

        questionRepository.save(Question.builder()
                .activity(act1)
                .prompt("Card 1: 🐶, Card 2: 🐱, Card 3: 🐶. Which two cards are matching friends?")
                .questionType("CHOICE")
                .visualData("🃏[1: 🐶] 🃏[2: 🐱] 🃏[3: 🐶]")
                .optionsJson("[\"Card 1 and Card 3\", \"Card 1 and Card 2\", \"Card 2 and Card 3\"]")
                .correctAnswer("Card 1 and Card 3")
                .hint("Both of these have happy puppies!")
                .explanation("Card 1 and Card 3 are both Puppies! 🐶❤️🐶")
                .build());
    }

    private void seedPuzzleActivities(Subject puzzle, World world) {
        Activity act1 = activityRepository.save(Activity.builder()
                .subject(puzzle)
                .world(world)
                .title("🏰 Tangram Castle Shapes")
                .instructions("Choose the shape that completes the castle tower bridge!")
                .difficulty(1)
                .rewardCoins(20)
                .rewardStars(1)
                .rewardXp(35)
                .iconEmoji("🧩")
                .build());

        questionRepository.save(Question.builder()
                .activity(act1)
                .prompt("The castle bridge has a triangular gap 🔺. Which shape fills it?")
                .questionType("CHOICE")
                .visualData("🏰 ── [🔺] ── 🏰")
                .optionsJson("[\"Triangle 🔺\", \"Square 🟦\", \"Circle 🔵\"]")
                .correctAnswer("Triangle 🔺")
                .hint("Find the shape with 3 corners!")
                .explanation("The triangle fits smoothly into the bridge! 🏰")
                .build());
    }

    private void seedCreativeActivities(Subject creative, World world) {
        Activity act1 = activityRepository.save(Activity.builder()
                .subject(creative)
                .world(world)
                .title("🎨 Dream Room Studio")
                .instructions("Choose the color theme and accessories to light up the room!")
                .difficulty(1)
                .rewardCoins(20)
                .rewardStars(1)
                .rewardXp(30)
                .iconEmoji("🎨")
                .build());

        questionRepository.save(Question.builder()
                .activity(act1)
                .prompt("What color combination makes the warmest sunset wall?")
                .questionType("CHOICE")
                .visualData("🌅 Sunset Horizon")
                .optionsJson("[\"Orange & Golden Yellow 🟧🟨\", \"Dark Gray & Black ⬛\", \"Deep Blue & Navy 🟦\"]")
                .correctAnswer("Orange & Golden Yellow 🟧🟨")
                .hint("Sunsets glow with warm golden sunlight!")
                .explanation("The sunset glows beautifully with warm orange and golden hues! 🎨✨")
                .build());
    }

    private void seedRewards() {
        // Hats
        rewardRepository.save(Reward.builder()
                .name("Golden Royal Crown")
                .category("HATS")
                .coinCost(50)
                .iconEmoji("👑")
                .assetKey("royal_crown")
                .colorHex("#ffd700")
                .description("A shining crown fit for the cleverest explorer!")
                .build());

        rewardRepository.save(Reward.builder()
                .name("Wizard Star Hat")
                .category("HATS")
                .coinCost(40)
                .iconEmoji("🧙‍♂️")
                .assetKey("wizard_hat")
                .colorHex("#7e57c2")
                .description("Embroidered with sparkling constellations!")
                .build());

        rewardRepository.save(Reward.builder()
                .name("Detective Cap")
                .category("HATS")
                .coinCost(30)
                .iconEmoji("🕵️")
                .assetKey("detective_cap")
                .colorHex("#8d6e63")
                .description("For brilliant mystery solvers!")
                .build());

        // Pets
        rewardRepository.save(Reward.builder()
                .name("Baby Dragon")
                .category("PETS")
                .coinCost(80)
                .iconEmoji("🐉")
                .assetKey("baby_dragon")
                .colorHex("#26a69a")
                .description("A tiny cute dragon that breathes sparkling bubbles!")
                .build());

        rewardRepository.save(Reward.builder()
                .name("Robot Drone Buddy")
                .category("PETS")
                .coinCost(60)
                .iconEmoji("🛸")
                .assetKey("robot_drone")
                .colorHex("#42a5f5")
                .description("Hovering flying pal that beeps happily!")
                .build());

        rewardRepository.save(Reward.builder()
                .name("Fluffy Bunny")
                .category("PETS")
                .coinCost(40)
                .iconEmoji("🐰")
                .assetKey("fluffy_bunny")
                .colorHex("#ffffff")
                .description("Loves hopping beside you during adventures!")
                .build());

        // Outfits & Cloaks
        rewardRepository.save(Reward.builder()
                .name("Super Explorer Cape")
                .category("CLOTHES")
                .coinCost(45)
                .iconEmoji("🦸")
                .assetKey("hero_cape")
                .colorHex("#e53935")
                .description("Flutters in the breeze as you run!")
                .build());

        rewardRepository.save(Reward.builder()
                .name("Cyber Space Suit")
                .category("CLOTHES")
                .coinCost(75)
                .iconEmoji("👨‍🚀")
                .assetKey("space_suit")
                .colorHex("#00e676")
                .description("Glowing futuristic armor for coding explorers!")
                .build());
    }

    private void seedAchievements() {
        achievementRepository.save(Achievement.builder()
                .code("FIRST_ADVENTURE")
                .title("First Adventure")
                .description("Completed your very first learning quest!")
                .iconEmoji("🏆")
                .coinBonus(30)
                .starBonus(2)
                .criteriaType("ACTIVITIES_COMPLETED")
                .criteriaTarget(1)
                .build());

        achievementRepository.save(Achievement.builder()
                .code("MATH_STAR")
                .title("Math Superstar")
                .description("Solved 2 exciting Mathematics challenges!")
                .iconEmoji("🧮")
                .coinBonus(40)
                .starBonus(3)
                .criteriaType("SUBJECT_COMPLETED")
                .criteriaTarget(2)
                .build());

        achievementRepository.save(Achievement.builder()
                .code("SUPER_DETECTIVE")
                .title("Super Detective")
                .description("Unraveled 2 secret mysteries with clues!")
                .iconEmoji("🔍")
                .coinBonus(40)
                .starBonus(3)
                .criteriaType("SUBJECT_COMPLETED")
                .criteriaTarget(2)
                .build());

        achievementRepository.save(Achievement.builder()
                .code("ROBOT_MASTER")
                .title("Robot Master")
                .description("Guided Robo-Buddy through programming lab puzzles!")
                .iconEmoji("🤖")
                .coinBonus(50)
                .starBonus(3)
                .criteriaType("SUBJECT_COMPLETED")
                .criteriaTarget(2)
                .build());

        achievementRepository.save(Achievement.builder()
                .code("COIN_COLLECTOR_100")
                .title("Treasure Hoarder")
                .description("Saved up 100 shiny gold coins in your purse!")
                .iconEmoji("💰")
                .coinBonus(50)
                .starBonus(5)
                .criteriaType("COINS_EARNED")
                .criteriaTarget(100)
                .build());

        achievementRepository.save(Achievement.builder()
                .code("STREAK_5")
                .title("5-Day Adventure Streak")
                .description("Explored the adventure world 5 days in a row!")
                .iconEmoji("🔥")
                .coinBonus(100)
                .starBonus(10)
                .criteriaType("STREAK_DAYS")
                .criteriaTarget(5)
                .build());
    }

    private void seedDailyChallenges() {
        LocalDate today = LocalDate.now();
        dailyChallengeRepository.save(DailyChallenge.builder()
                .title("Count the Apple Orchard")
                .description("Complete 1 quest on Math Island today!")
                .iconEmoji("🍎")
                .challengeType("MATH_COUNT")
                .requiredCount(1)
                .rewardCoins(25)
                .rewardStars(1)
                .targetDate(today)
                .build());

        dailyChallengeRepository.save(DailyChallenge.builder()
                .title("Detective Lock Picker")
                .description("Solve 1 clue mystery in Mystery House!")
                .iconEmoji("🗝️")
                .challengeType("SOLVE_MYSTERY")
                .requiredCount(1)
                .rewardCoins(25)
                .rewardStars(1)
                .targetDate(today)
                .build());

        dailyChallengeRepository.save(DailyChallenge.builder()
                .title("Robo Navigator")
                .description("Program Robo-Buddy to reach the star in Coding Lab!")
                .iconEmoji("🤖")
                .challengeType("CODING_PUZZLE")
                .requiredCount(1)
                .rewardCoins(30)
                .rewardStars(2)
                .targetDate(today)
                .build());
    }

    private void seedDemoUsers() {
        // 1. Admin
        User adminUser = userRepository.save(User.builder()
                .username("admin")
                .email("admin@adventure.com")
                .password(passwordEncoder.encode("admin123"))
                .role(Role.ROLE_ADMIN)
                .build());

        // 2. Parent
        User parentUser = userRepository.save(User.builder()
                .username("parent_sarah")
                .email("sarah@adventure.com")
                .password(passwordEncoder.encode("parent123"))
                .role(Role.ROLE_PARENT)
                .build());

        ParentProfile parentProfile = parentProfileRepository.save(ParentProfile.builder()
                .user(parentUser)
                .fullName("Sarah Jenkins")
                .phone("+1-555-0199")
                .build());

        // 3. Child
        User childUser = userRepository.save(User.builder()
                .username("leo_explorer")
                .email("leo@adventure.com")
                .password(passwordEncoder.encode("child123"))
                .role(Role.ROLE_CHILD)
                .build());

        ChildProfile childProfile = childProfileRepository.save(ChildProfile.builder()
                .user(childUser)
                .parent(parentProfile)
                .displayName("Leo The Explorer")
                .coins(120)
                .stars(15)
                .currentLevel(2)
                .experiencePoints(140)
                .streakDays(3)
                .lastActiveDate(LocalDate.now())
                .avatarData("{\"skinColor\":\"#ffcc80\",\"hairStyle\":\"spiky\",\"hairColor\":\"#3e2723\",\"outfitColor\":\"#29b6f6\",\"hat\":\"royal_crown\",\"accessory\":\"none\",\"pet\":\"baby_dragon\"}")
                .build());

        // Give initial reward unlocked to Leo
        rewardRepository.findAll().stream().findFirst().ifPresent(reward -> {
            childRewardRepository.save(ChildReward.builder()
                    .child(childProfile)
                    .reward(reward)
                    .isEquipped(true)
                    .build());
        });

        // Give first achievement to Leo
        achievementRepository.findByCode("FIRST_ADVENTURE").ifPresent(ach -> {
            childAchievementRepository.save(ChildAchievement.builder()
                    .child(childProfile)
                    .achievement(ach)
                    .build());
        });
    }
}
