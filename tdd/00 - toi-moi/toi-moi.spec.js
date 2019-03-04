import { toiMoi } from './toi-moi'

describe("Toi Moi", () => {
    test("Pass nothing in parameter, it should return 'Un pour toi, Un pour moi'", () => {
        expect(toiMoi()).toEqual("Un pour toi, Un pour moi")
    })

    test("Pass null in parameter, it should return 'Un pour toi, Un pour moi'", () => {
        expect(toiMoi(null)).toEqual("Un pour toi, Un pour moi")
    })

    test("Pass undefined in parameter, it should return 'Un pour toi, Un pour moi'", () => {
        expect(toiMoi(undefined)).toEqual("Un pour toi, Un pour moi")
    })

    test("Pass 16 in parameter, it should return 'Un pour 16, Un pour moi'", () => {
        expect(toiMoi(16)).toEqual("Un pour 16, Un pour moi")
    })

    test("Pass 'Ben' in parameter, it should return 'Un pour Ben, Un pour moi'", () => {
        expect(toiMoi('Ben')).toEqual("Un pour Ben, Un pour moi")
    })

    test("Pass 'Linus Torvalds' in parameter, it should return 'Un pour Linus Torvalds, Un pour moi'", () => {
        expect(toiMoi('Linus Torvalds')).toEqual("Un pour Linus Torvalds, Un pour moi")
    })

    test("Pass 'Mr.\n Dupont' in parameter, it should return 'Un pour Mr.\n Dupont, Un pour moi'", () => {
        expect(toiMoi('Mr.\n Dupont')).toEqual("Un pour Mr.\n Dupont, Un pour moi")
    })

    test("Pass 'Cristiano' in parameter, it should return 'Meilleur joueur du monde'", () => {
        expect(toiMoi('Cristiano')).toEqual("Meilleur joueur du monde")
    })
})