# 🎓 Student API

> REST API for student management — built with **ElysiaJS** & **Bun**

![CI](https://github.com/Bloomooo/elysia-pipeline/actions/workflows/ci.yml/badge.svg)
![Version](https://img.shields.io/badge/version-1.0.50-blue)
![Bun](https://img.shields.io/badge/bun-1.2.23-f9f1e1?logo=bun)
![Node](https://img.shields.io/badge/node-v24.9.0-339933?logo=node.js)
![ElysiaJS](https://img.shields.io/badge/elysia-1.4.28-black)
![Platform](https://img.shields.io/badge/ubuntu-24.04-E95420?logo=ubuntu)
![License](https://img.shields.io/badge/license-private-lightgrey)

---

## 📋 Prérequis

| Outil | Version |
|-------|---------|
| [Bun](https://bun.sh) | `1.2.23` |
| Node.js | `v24.9.0` |
| npm | `11.6.0` |
| Ubuntu | `24.04.3 LTS` |

---

## 🚀 Installation

```bash
# Cloner le dépôt
git clone https://github.com/Bloomooo/elysia-pipeline.git
cd elysia-pipeline

# Installer les dépendances
bun install
```

---

## ⚡ Commandes

### Développement

```bash
# Lancer le serveur en mode watch (hot reload)
bun dev
```

### Tests

```bash
# Lancer les tests
bun test

# Lancer les tests avec coverage
bun test --coverage
```

### Lint

```bash
# Vérifier le code
bun lint

# Corriger automatiquement
bun lint:fix
```

---

## 📡 Endpoints

| Méthode | Route | Description |
|---------|-------|-------------|
| `GET` | `/students` | Liste paginée et triée des étudiants |
| `GET` | `/students/:id` | Récupérer un étudiant par ID |
| `GET` | `/students/search?q=` | Rechercher des étudiants |
| `GET` | `/students/stats` | Statistiques agrégées |
| `POST` | `/students` | Créer un étudiant |
| `PUT` | `/students/:id` | Mettre à jour un étudiant |
| `DELETE` | `/students/:id` | Supprimer un étudiant |
| `GET` | `/students/reset` | Réinitialiser les données |

### Paramètres de pagination & tri (`GET /students`)

| Paramètre | Type | Défaut | Description |
|-----------|------|--------|-------------|
| `page` | number | `1` | Numéro de page |
| `limit` | number | `10` | Résultats par page |
| `sort` | string | — | Champ de tri (`id`, `firstName`, `lastName`, `email`, `grade`, `field`) |
| `order` | string | `asc` | Ordre de tri (`asc` / `desc`) |

---

## 📄 Documentation API

La documentation OpenAPI (Swagger UI) est disponible après démarrage du serveur :

👉 **[http://localhost:3000/openapi](http://localhost:3000/openapi)**

---

## 🗂️ Structure du projet

```
src/
├── index.ts                  # Point d'entrée
├── routes/
│   └── student/
│       └── student.routes.ts
├── controllers/
│   └── student/
│       └── student.controller.ts
├── services/
│   └── student/
│       └── student.service.ts
└── models/
    └── student.model.ts
tests/
└── students/
    └── student.test.ts
```

---

## 🧩 Modèle Student

```typescript
{
  id: number,
  firstName: string,
  lastName: string,
  email: string,         // format email, unique
  grade: number,         // entre 0 et 20
  field: "informatique" | "mathématiques" | "physique" | "chimie"
}
```

---

## 🔧 Stack technique

- **[ElysiaJS](https://elysiajs.com/)** — Framework HTTP ultra-rapide pour Bun
- **[@elysiajs/openapi](https://elysiajs.com/plugins/openapi)** — Génération automatique de la doc OpenAPI
- **[Bun](https://bun.sh/)** — Runtime JavaScript/TypeScript
- **[ESLint](https://eslint.org/)** + **typescript-eslint** — Linting statique