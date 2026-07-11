import { CardData } from "./storage";

export const defaultMachineLearningCardData: CardData = {
  tasks: [],
  sections: [
    {
      id: 301,
      heading: "1. Python Basics",
      tasks: [
        { id: 30101, text: "Python Installation, Variables & Data Types", completed: false },
        { id: 30102, text: "Operators, Input/Output & Strings", completed: false },
        { id: 30103, text: "Data Structures: Lists, Tuples, Sets & Dictionaries", completed: false },
        { id: 30104, text: "Loops & Conditional Statements", completed: false },
        { id: 30105, text: "Functions, Lambda Functions & List Comprehensions", completed: false },
        { id: 30106, text: "Exception Handling & File Handling", completed: false },
        { id: 30107, text: "Modules, Packages & Object-Oriented Programming (OOP)", completed: false },
        { id: 30108, text: "Virtual Environments & Package Manager (pip)", completed: false }
      ]
    },
    {
      id: 302,
      heading: "2. Mathematics for Machine Learning",
      tasks: [
        { id: 30201, text: "Linear Algebra: Vectors, Matrices, Tensors & Operations", completed: false },
        { id: 30202, text: "Matrix Multiplication, Transpose, Determinant & Inverse", completed: false },
        { id: 30203, text: "Eigenvalues, Eigenvectors, Orthogonality & Singular Value Decomposition (SVD)", completed: false },
        { id: 30204, text: "Calculus: Derivatives, Partial Derivatives & Chain Rule", completed: false },
        { id: 30205, text: "Calculus: Gradients, Jacobian, Hessian & Gradient Descent Optimization", completed: false },
        { id: 30206, text: "Probability Basics: Conditional Probability & Bayes' Theorem", completed: false },
        { id: 30207, text: "Random Variables & Distributions: Bernoulli, Binomial, Poisson, Gaussian & Central Limit Theorem", completed: false },
        { id: 30208, text: "Statistics: Mean, Median, Mode, Variance, Standard Deviation, Covariance & Correlation", completed: false },
        { id: 30209, text: "Hypothesis Testing: Confidence Intervals, p-values, ANOVA & Chi-Square Tests", completed: false }
      ]
    },
    {
      id: 303,
      heading: "3. Python Libraries",
      tasks: [
        { id: 30301, text: "NumPy: Arrays, Indexing, Reshaping & Broadcasting", completed: false },
        { id: 30302, text: "NumPy: Mathematical Operations & Linear Algebra", completed: false },
        { id: 30303, text: "Pandas: Series, DataFrames, File Reading & Data Cleaning", completed: false },
        { id: 30304, text: "Pandas: Merges, GroupBy, Pivot Tables, DateTime & Apply Functions", completed: false },
        { id: 30305, text: "Matplotlib: Line, Scatter, Histograms, Pie, Bar Plots & Subplots", completed: false },
        { id: 30306, text: "Seaborn: Distribution, Pair, Heatmap, Box, Violin & Count Plots", completed: false }
      ]
    },
    {
      id: 304,
      heading: "4. Data Preprocessing",
      tasks: [
        { id: 30401, text: "Data Cleaning: Missing, Duplicate & Outlier Values, Noise Removal", completed: false },
        { id: 30402, text: "Feature Engineering: Selection, Extraction & Creation", completed: false },
        { id: 30403, text: "Encoding: Label Encoding, One-Hot Encoding & Target Encoding", completed: false },
        { id: 30404, text: "Scaling: Normalization & Standardization", completed: false },
        { id: 30405, text: "Data Splitting: Train/Test Split, Validation Sets, Cross-Validation & Stratified Sampling", completed: false }
      ]
    },
    {
      id: 305,
      heading: "5. Exploratory Data Analysis (EDA)",
      tasks: [
        { id: 30501, text: "Data Inspection & Descriptive Summary Statistics", completed: false },
        { id: 30502, text: "Correlation Analysis & Feature Distribution Analysis", completed: false },
        { id: 30503, text: "Feature Importance & Outlier Detection", completed: false },
        { id: 30504, text: "Missing Data Analysis, Visualizations & Insights Generation", completed: false }
      ]
    },
    {
      id: 306,
      heading: "6. Supervised Machine Learning (Regression)",
      tasks: [
        { id: 30601, text: "Linear Regression: Simple & Multiple", completed: false },
        { id: 30602, text: "Polynomial Regression", completed: false },
        { id: 30603, text: "Regularization: Ridge Regression, Lasso Regression & Elastic Net", completed: false },
        { id: 30604, text: "Metrics: MAE, MSE, RMSE, R² Score & Adjusted R²", completed: false }
      ]
    },
    {
      id: 307,
      heading: "7. Supervised Machine Learning (Classification)",
      tasks: [
        { id: 30701, text: "Logistic Regression", completed: false },
        { id: 30702, text: "Instance-Based & SVM: K-Nearest Neighbors (KNN) & Support Vector Machines (SVM)", completed: false },
        { id: 30703, text: "Decision Trees, Random Forest & Extra Trees", completed: false },
        { id: 30704, text: "Naive Bayes Classifier", completed: false },
        { id: 30705, text: "Boosting: AdaBoost, Gradient Boosting, XGBoost, LightGBM & CatBoost", completed: false },
        { id: 30706, text: "Metrics: Accuracy, Precision, Recall, F1 Score & ROC-AUC Curve", completed: false },
        { id: 30707, text: "Confusion Matrix, Precision-Recall Curve & Log Loss", completed: false }
      ]
    },
    {
      id: 308,
      heading: "8. Unsupervised Learning",
      tasks: [
        { id: 30801, text: "Clustering: K-Means, Hierarchical Clustering & DBSCAN", completed: false },
        { id: 30802, text: "Clustering: Gaussian Mixture Models (GMM) & Mean Shift", completed: false },
        { id: 30803, text: "Dimensionality Reduction: PCA, Kernel PCA, LDA, t-SNE & UMAP", completed: false },
        { id: 30804, text: "Association Rule Learning: Apriori & FP Growth", completed: false }
      ]
    },
    {
      id: 309,
      heading: "9. Model Evaluation & Optimization",
      tasks: [
        { id: 30901, text: "Bias vs. Variance Tradeoff, Overfitting & Underfitting", completed: false },
        { id: 30902, text: "Cross-Validation Techniques", completed: false },
        { id: 30903, text: "Hyperparameter Search: Grid Search, Random Search & Bayesian Optimization", completed: false },
        { id: 30904, text: "Analyzing Learning Curves & Validation Curves", completed: false }
      ]
    },
    {
      id: 310,
      heading: "10. Ensemble Learning",
      tasks: [
        { id: 31001, text: "Bagging (Bootstrap Aggregating)", completed: false },
        { id: 31002, text: "Boosting Architectures & Stacking Models", completed: false },
        { id: 31003, text: "Voting Classifiers & Voting Regressors", completed: false }
      ]
    },
    {
      id: 311,
      heading: "11. Deep Learning Fundamentals",
      tasks: [
        { id: 31101, text: "Neural Networks: Perceptron, Activation Functions & Feed-Forward", completed: false },
        { id: 31102, text: "Backpropagation Algorithm & Weight Initialization", completed: false },
        { id: 31103, text: "Loss Functions, Optimizers & Regularization (Dropout, Batch Norm)", completed: false }
      ]
    },
    {
      id: 312,
      heading: "12. TensorFlow & Keras",
      tasks: [
        { id: 31201, text: "TensorFlow Installation, Tensor Operations & Custom Training Loops", completed: false },
        { id: 31202, text: "Sequential API & Functional API Architectures", completed: false },
        { id: 31203, text: "Custom Layers, Custom Loss & TensorBoard Logging", completed: false },
        { id: 31204, text: "Dense, CNN & RNN Layers Compile, Fit, Evaluate & Predict", completed: false },
        { id: 31205, text: "Callbacks: Early Stopping & Model Checkpoints", completed: false }
      ]
    },
    {
      id: 313,
      heading: "13. PyTorch",
      tasks: [
        { id: 31301, text: "PyTorch Tensors, Autograd & Computation Graphs", completed: false },
        { id: 31302, text: "nn.Module, Datasets & DataLoaders", completed: false },
        { id: 31303, text: "Building training loops, GPU training & Saving/Loading Models", completed: false }
      ]
    },
    {
      id: 314,
      heading: "14. Computer Vision Basics",
      tasks: [
        { id: 31401, text: "OpenCV: Image Reading, Processing & Thresholding", completed: false },
        { id: 31402, text: "Edge Detection, Finding Contours & Face Detection", completed: false }
      ]
    },
    {
      id: 315,
      heading: "15. Computer Vision (CNN & Object Detection)",
      tasks: [
        { id: 31501, text: "CNN: Convolution Operations, Pooling & Padding", completed: false },
        { id: 31502, text: "Transfer Learning & Popular Models: LeNet, AlexNet, VGG & ResNet", completed: false },
        { id: 31503, text: "Inception, MobileNet & EfficientNet", completed: false },
        { id: 31504, text: "Object Detection: R-CNN, Fast R-CNN, Faster R-CNN, SSD & YOLO", completed: false },
        { id: 31505, text: "Image Segmentation: U-Net & Mask R-CNN", completed: false }
      ]
    },
    {
      id: 316,
      heading: "16. Natural Language Processing (NLP)",
      tasks: [
        { id: 31601, text: "Text Cleaning, Tokenization, Stemming, Lemmatization & Stop Words", completed: false },
        { id: 31602, text: "Feature Extraction: TF-IDF, Word2Vec, GloVe & FastText", completed: false },
        { id: 31603, text: "Seq2Seq, Attention Mechanisms & Transformers Architecture", completed: false },
        { id: 31604, text: "Modern Models: BERT, GPT, RoBERTa & T5", completed: false },
        { id: 31605, text: "Libraries: NLTK, spaCy & Hugging Face Transformers", completed: false }
      ]
    },
    {
      id: 317,
      heading: "17. Time Series Analysis",
      tasks: [
        { id: 31701, text: "Time Series Basics: Stationarity, AR, MA & ARMA Models", completed: false },
        { id: 31702, text: "ARIMA, SARIMA & Prophet Forecasting Models", completed: false },
        { id: 31703, text: "Deep Learning for Time Series Forecasting (LSTM)", completed: false }
      ]
    },
    {
      id: 318,
      heading: "18. Reinforcement Learning",
      tasks: [
        { id: 31801, text: "Markov Decision Process (MDP) Concepts", completed: false },
        { id: 31802, text: "Temporal Difference: Q-Learning & SARSA", completed: false },
        { id: 31803, text: "Deep Q Networks (DQN), Policy Gradients, PPO & Actor-Critic", completed: false }
      ]
    },
    {
      id: 319,
      heading: "19. Generative AI",
      tasks: [
        { id: 31901, text: "Large Language Models (LLMs) & Prompt Engineering", completed: false },
        { id: 31902, text: "Fine-Tuning: PEFT & LoRA", completed: false },
        { id: 31903, text: "Retrieval-Augmented Generation (RAG) & Vector Databases", completed: false },
        { id: 31904, text: "AI Agents Frameworks: LangChain & LlamaIndex", completed: false },
        { id: 31905, text: "Model Context Protocol (MCP)", completed: false }
      ]
    },
    {
      id: 320,
      heading: "20. MLOps",
      tasks: [
        { id: 32001, text: "Git Version Control, Docker Containerization & Kubernetes Orchestration", completed: false },
        { id: 32002, text: "Pipelines: MLflow, DVC, Airflow & Kubeflow", completed: false },
        { id: 32003, text: "CI/CD, Experiment Tracking, Model Registry & Feature Stores", completed: false },
        { id: 32004, text: "Monitoring: Data & Model Drift Detection", completed: false }
      ]
    },
    {
      id: 321,
      heading: "21. Deployment",
      tasks: [
        { id: 32101, text: "Creating APIs: Flask & FastAPI", completed: false },
        { id: 32102, text: "Web Demos: Streamlit & Gradio", completed: false },
        { id: 32103, text: "Nginx, Docker Compose & cloud servers (AWS, GCP, Azure)", completed: false },
        { id: 32104, text: "PaaS: Vercel, Render & Railway", completed: false }
      ]
    },
    {
      id: 322,
      heading: "22. Databases",
      tasks: [
        { id: 32201, text: "Relational Databases: MySQL, PostgreSQL & SQLite", completed: false },
        { id: 32202, text: "NoSQL Databases: MongoDB & Redis", completed: false },
        { id: 32203, text: "Data Warehouses: Google BigQuery, Snowflake & Amazon Redshift", completed: false }
      ]
    },
    {
      id: 323,
      heading: "23. Big Data",
      tasks: [
        { id: 32301, text: "Hadoop Ecosystem & Apache Hive", completed: false },
        { id: 32302, text: "Apache Spark & PySpark", completed: false },
        { id: 32303, text: "Apache Kafka Streaming", completed: false }
      ]
    },
    {
      id: 324,
      heading: "24. Cloud for ML",
      tasks: [
        { id: 32401, text: "AWS S3 storage & Amazon SageMaker", completed: false },
        { id: 32402, text: "Azure ML & Google Cloud Vertex AI", completed: false },
        { id: 32403, text: "IAM, Cloud Storage & GPU Instance Provisioning", completed: false }
      ]
    },
    {
      id: 325,
      heading: "25. Explainable AI & Production ML",
      tasks: [
        { id: 32501, text: "Interpretability: SHAP, LIME & Partial Dependence Plots", completed: false },
        { id: 32502, text: "Bias Detection & Model Fairness", completed: false },
        { id: 32503, text: "Model/Data Versioning, Logging & Monitoring", completed: false },
        { id: 32504, text: "Pipeline Retraining, A/B Testing & Shadow/Canary Deployments", completed: false }
      ]
    },
    {
      id: 326,
      heading: "26. Software Engineering for ML",
      tasks: [
        { id: 32601, text: "Git/GitHub, Linux commands & Bash scripting", completed: false },
        { id: 32602, text: "APIs, JSON, YAML & Environment Variables", completed: false },
        { id: 32603, text: "Unit Testing, Logging & Software Design Patterns", completed: false }
      ]
    }
  ]
};
