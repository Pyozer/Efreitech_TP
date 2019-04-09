class GameContext {
    static var instance = GameContext()
    
    var nbOfLifeRemaining: Int = 0 {
        didSet {
            let nickname = playerNickname ?? "You"
            if oldValue > nbOfLifeRemaining {
                print("\(nickname) lose \(oldValue - nbOfLifeRemaining) life 😢 ( \(nbOfLifeRemaining) remaining)")
            } else {
                print("\(nickname) won \(nbOfLifeRemaining - oldValue) life 🎉 ( \(nbOfLifeRemaining) remaining)")
            }
        }
    }
    var playerNickname: String? {
        didSet {
            print("Hi \(playerNickname ?? "You") !")
        }
    }
    
    private init() {}
    
    func addOneLife() {
        nbOfLifeRemaining += 1
    }
    
    func removeOneLife() {
        if nbOfLifeRemaining > 0 {
            nbOfLifeRemaining -= 1
        } else {
            print("Game Over")
        }
    }
}

class Enemy {
    func attack() {
        print("Enemy attack !")
        GameContext.instance.removeOneLife()
    }
}

class Game {
    var enemy: Enemy
    
    init(enemy: Enemy) {
        self.enemy = enemy
    }
    
    func chooseANickname(nickname: String) {
        GameContext.instance.playerNickname = nickname
    }
    
    func findAndTakeLife() {
        GameContext.instance.addOneLife()
    }
    
    func play() {
        print("Write your nickname :")
        print("PodPak") // Simulate user input
        chooseANickname(nickname: "PodPak")
        print("\nSTART PLAYING !\n")
        findAndTakeLife()
        enemy.attack()
        enemy.attack()
    }
}

let game = Game(enemy: Enemy())
game.play()
