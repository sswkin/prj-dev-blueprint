The file is missing several closing characters. Here's the fixed version with the added closures:

1. Missing closing `</a>` tag in the Bolt.new link near the end:
```jsx
<a 
  href="https://bolt.new" 
  target="_blank" 
  rel="noopener noreferrer"
  className="hover:underline"
>
  bolt.new
</a>
```

2. Missing closing `}` for the entire component:
```jsx
export default function HomePage() {
  // ... rest of component code ...
}
```

The complete fix would be to add these closures in their appropriate places. The full corrected ending of the file should look like this:

```jsx
                      href="https://bolt.new" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      bolt.new
                    </a>
                    Blueprint Journey
                  </span>
                </motion.div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
```