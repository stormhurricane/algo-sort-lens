# algo-sort-lens

Ein interaktiver, modularer Visualizer für Sortieralgorithmen, gebaut mit HTML5, CSS3 und modernem Vanilla JavaScript (ES Modules).

## 🚀 Ziel des Projekts
Das Ziel von **algo-sort-lens** ist die anschauliche Gegenüberstellung von Sortieralgorithmen in Echtzeit. Das Projekt demonstriert die Kapselung von Algorithmus-Logik über Ereignis-Warteschlangen (Event Queues) sowie die asynchrone Entkopplung von Datenberechnung und DOM-Rendering.

## 🛠 Core Features
- **Parallel-Animation:** Simultaner Ablauf von 4 Algorithmen in einem 2x2 Grid.
- **Echtzeit-Metriken:** Live-Anzeige von Vergleichen (Compares) und Schreib-/Tauschoperationen (Swaps/Writes).
- **Entkoppelte Rendering-Engine:** Algorithmen erzeugen vorab eine abstrahierte Event-Queue, die von der Animation-Engine schrittweise konsumiert wird.
- **Interaktives Control-Panel:** Dynamische Geschwindigkeitssteuerung, Reset-Funktion und Generierung neuer Datensätze.

---

## 💡 Konzeptuelle Logik & Architektur

Das Kernkonzept von `algo-sort-lens` basiert auf einer strikten **Trennung von Algorithmus und Visualisierung**:

### 1. Pure Deterministic Execution & Event Recording
Anstatt das DOM während des Sortierens direkt zu manipulieren (was zu unvorhersehbaren Race-Conditions und unsauberen Async-Operationen führen würde), arbeiten die Algorithmus-Funktionen auf einer Kopie des Eingabe-Arrays.
Während des Durchlaufs zeichnet der Algorithmus jeden Teilschritt in einer **Animation-Queue** auf:

- `COMPARE`: Markiert die gerade verglichenen Indizes.
- `SWAP`: Dokumentiert den Positionswechsel zweier Elemente.
- `OVERWRITE`: Kennzeichnet das gezielte Überschreiben eines Werts (z. B. bei Merge Sort).
- `SORTED`: Signalisiert, dass ein Element seine finale Position erreicht hat.

### 2. Async Frame Consumer (`playAnimation`)
Eine zentrale Asynchron-Funktion liest die erzeugte Queue der Reihe nach aus. Sie steuert die Visualisierung über eine versprochene Zeitverzögerung (`await sleep(ms)`):
1. **Highlighting:** Setzen der passenden CSS-Klassen (`.comparing`, `.swapping`, `.sorted`).
2. **DOM-Mutation:** Tauschen oder Ersetzen der Balkenhöhen.
3. **Statistik-Update:** Inkrementieren der lokalen Zähler für Vergleiche und Tausche.
4. **Cleanup:** Zurücksetzen der Hervorhebungen für den nächsten Frame.

---

## 📊 Unterstüzte Algorithmen

| Algorithmus | Zeitkomplexität (Average) | Prinzip |
| :--- | :--- | :--- |
| **Bubble Sort** | $\mathcal{O}(n^2)$ | Tauscht fortlaufend benachbarte Elemente, bis das Maximum nach oben "blubbert". |
| **Selection Sort** | $\mathcal{O}(n^2)$ | Sucht sequenziell das Minimum und setzt es an die vorderste freie Position. |
| **Insertion Sort** | $\mathcal{O}(n^2)$ | Sortiert Elemente wie Spielkarten fortlaufend in den linken Teilbereich ein. |
| **Merge Sort** | $\mathcal{O}(n \log n)$ | Rekursives Teilen und zusammenführen sortierter Teil-Arrays (Divide & Conquer). |