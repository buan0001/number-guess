import java.util.*;

public class NumberGuess{
    public static void main(String[] args) {
        System.out.println("Nu leger vi gæt et tal");
        Scanner scanner = new Scanner(System.in);
        
        int secretNumber = new Random().nextInt(0, 100);
        System.out.println("The secret number is " + secretNumber);
        int guess;
        do {
            System.out.println("Indtast et gæt");
            guess = scanner.nextInt(); 

            if (guess > secretNumber) {
                System.out.println("Du gættede for højt, prøv igen");
            }
            if (guess < secretNumber) {
                System.out.println("Du gættede for lavt, prøv igen");
            }
        }
        while (guess != secretNumber);
        System.out.println("Yes, you guessed it! The correct number was " + secretNumber);
        scanner.close();
    }
}