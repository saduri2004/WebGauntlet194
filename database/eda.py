import sqlite3
import os
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

def get_database_path():
    """Get the path to the database file."""
    return os.path.join(os.path.dirname(__file__), 'ecommerce.db')

def connect_to_database():
    """Connect to the SQLite database."""
    db_path = get_database_path()
    return sqlite3.connect(db_path)

def analyze_products():
    """Perform exploratory data analysis on products."""
    conn = connect_to_database()
    
    # Read products into a DataFrame
    products_df = pd.read_sql_query("SELECT * FROM products_capped", conn)
    
    # Close the connection
    conn.close()
    
    # Basic statistics
    print("Product Analysis:")
    print("Total Products:", len(products_df))
    
    # Category distribution
    category_counts = products_df['category'].value_counts()
    print("\nCategory Distribution:")
    print(category_counts)
    
    # Price distribution
    plt.figure(figsize=(10, 6))
    sns.histplot(products_df['base_price'], kde=True)
    plt.title('Price Distribution')
    plt.xlabel('Price')
    plt.ylabel('Frequency')
    plt.savefig(os.path.join(os.path.dirname(__file__), 'price_distribution.png'))
    plt.close()
    
    # Category-wise price boxplot
    plt.figure(figsize=(12, 6))
    sns.boxplot(x='category', y='base_price', data=products_df)
    plt.title('Price Distribution by Category')
    plt.xticks(rotation=45)
    plt.tight_layout()
    plt.savefig(os.path.join(os.path.dirname(__file__), 'category_price_boxplot.png'))
    plt.close()
    
    # Stock analysis
    print("\nStock Analysis:")
    print(products_df['stock'].describe())

def main():
    analyze_products()

if __name__ == '__main__':
    main()
