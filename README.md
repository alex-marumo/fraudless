**FRAUDLESS**

A behavioral anomaly detection system designed to catch financial threats using unsupervised machine learning to identify the "graphical shape" of suspicious activity.

**The Brain:** Isolation Forest

This system utilizes the Isolation Forest algorithm (via scikit-learn).

Unlike traditional models that try to learn what "Normal" is, an Isolation Forest explicitly hunts for Anomalies. It works on the principle that fraudulent transactions are few and different.
How it works:

    Recursive Partitioning: The model builds a forest of random decision trees.

    Isolation Depth: * Normal transactions are clustered together; it takes many "splits" to isolate them.

        Anomalies are outliers; they are isolated much faster (shorter path length).

    Anomaly Scoring: We use the decision_function to calculate a score.

        Positive Score: The transaction is buried deep in the cluster of normalcy.

        Negative Score: The transaction is isolated on the fringes of the forest.

**The Triangle of Trust**

The model doesn't just look at numbers; it looks at the intersection of three critical features:

    Amount (Economic Intent): Is the value significantly higher than the user's typical behavior?

    Time (Temporal Habit): Is the transaction happening during the "Shadow Hours" (late night/early morning)?

    Distance (Geospatial Consistency): Is the transaction occurring far from the user's known coordinates?

**Tiered Risk Logic**

The system outputs three distinct states based on the AI's confidence:
Risk Level AI Confidence UI Action
System Secure High (Deep Inlier) Green Light: Auto-Approved
Suspicious Moderate (Outskirts) Amber Light: Trigger Review / MFA
Critical Threat Low (True Outlier) Red Light: Immediate Flag
💻 Tech Stack

    Engine: Python 3.12 (FastAPI)

    Intelligence: Scikit-learn (Isolation Forest), NumPy

    Frontend: Next.js 15 (Turbopack), Tailwind CSS, Lucide Icons

    Analytics: Recharts (Decision Topography)
